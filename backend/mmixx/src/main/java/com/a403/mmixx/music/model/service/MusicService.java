package com.a403.mmixx.music.model.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.*;

import javax.transaction.Transactional;

import com.a403.mmixx.auth.entity.Role;
import com.a403.mmixx.music.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.entity.MusicRepository;
import com.a403.mmixx.preset.model.entity.Preset;
import com.a403.mmixx.preset.model.entity.PresetRepository;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicService {
	private final MusicRepository musicRepository;
	private final PresetRepository presetRepository;
	private final AwsS3Service awsS3Service;

	public Page<MusicListResponseDto> getMusicList(Pageable pageable, Integer user_seq) {
//		return musicRepository.findAll(pageable).map(MusicListResponseDto::new);
		return musicRepository.findByUser_UserSeq(user_seq, pageable).map(MusicListResponseDto::new);
	}

	public Page<MusicListResponseDto> getMusicListByCondition(Integer user_seq, MusicCondition condition, Pageable pageable) {
		return musicRepository.getMusicListByCondition(user_seq, condition, pageable);
	}

	public MusicDetailResponseDto getMusic(Integer seq) {
		Music music = musicRepository.findById(seq)
				.orElseThrow(() -> new IllegalArgumentException("해당 음악은 없습니다. 방 ID: " + seq)); // error code: 500
		return new MusicDetailResponseDto(music);
	}

	@Transactional
	public Music updateMusic(Integer seq, MusicUpdateRequestDto requestDto) {
		Music music = musicRepository.findById(seq).orElse(null);
		if (music != null) {
			music.updateMusic(requestDto);
		}
		return music;
	}

	@Transactional
	public Music deleteMusic(Integer music_seq) {
		Music music = musicRepository.findById(music_seq).orElse(null);
		String filename = music.getMusicUrl().replace("https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/music/", "");
		System.out.println("filename : " + filename);
		if (music != null) {
			awsS3Service.deleteMusic(filename);
			musicRepository.deleteById(music_seq);
		}
		return music;
	}

	public List<Music> registMusic(MusicRegistRequestDto user, List<MultipartFile> multipartFiles) throws Exception {
		
		// TODO: EC2 서버에 아예 .mp3 파일째로 저장해버리기. S3 에도 저장하고. .tmp 생성경로가 너무 말썽이다.
		List<Music> musicContainerList = uploadMusicAndArtworkWithMetadata(multipartFiles);
		
		for (Music music : musicContainerList) {
			music.setUser(new User(user.getUserSeq(), Role.USER));
		}

		log.info("musicContainerList: " + musicContainerList);
		musicRepository.saveAll(musicContainerList);

		//	print musicContainerList's data, cascade
		for (Music music : musicContainerList) {
			log.info("musicName: " + music.getMusicName());
			log.info("musicUrl: " + music.getMusicUrl());
			log.info("coverImage: " + music.getCoverImage());
			log.info("length: " + music.getMusicLength());
			log.info("artist: " + music.getMusicianName());
			log.info("album: " + music.getAlbumName());
		}

		return musicContainerList;
	}

	//	Extract Metadata from ID3v2 format and music + cover image upload to S3
	public List<Music> uploadMusicAndArtworkWithMetadata(List<MultipartFile> multipartFiles) throws Exception {

		//	Deep copy for redundant use of stream
		List<InputStream> multipartFilesCopy1 = new ArrayList<>();

		for (MultipartFile multipartFile : multipartFiles) {
			//	save multipartFile(extend of InputStream) to ByteArrayOutputStream
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			InputStream is = multipartFile.getInputStream();
			is.transferTo(baos);
			InputStream multipartFileInputStreamClone1 = multipartFile.getInputStream();

			multipartFilesCopy1.add(multipartFileInputStreamClone1);
			is.close();
		}
		
		List<Music> musicContainerList;
		List<String> musicUrlList;
		List<String> coverImageList;
		
		System.out.println("uploadMusicToS3");
		musicUrlList = awsS3Service.uploadMusicToS3(multipartFiles);
		System.out.println("uploadCoverImageToS3");
		List<String>[] res = awsS3Service.uploadCoverImageToS3(multipartFiles);
		coverImageList = res[0];
		
		System.out.println("S3 업로드 끝");
		
		System.out.println("MusicService getOriginalFilename : " + multipartFiles.get(0).getOriginalFilename());
		System.out.println("MusicService getSize : " + multipartFiles.get(0).getSize());
		
		System.out.println("End upload");
//		WARN 14280 --- [nio-5555-exec-1] s.w.m.s.StandardServletMultipartResolver : Failed to perform cleanup of multipart items
//		C:\Users\SSAFY\AppData\Local\Temp\tomcat.5555.6401783967014632574\work\Tomcat\localhost\api\ upload_c84fc623_5e93_45cd_b1b0_ae7e377fa2d4_00000000.tmp
		musicContainerList = MP3MetadataService.extractMetadataFromMultipartFileList(res[1], multipartFiles);


		for (int i = 0; i < musicContainerList.size(); i++) {
			musicContainerList.get(i).setMusicUrl(musicUrlList.get(i));
			musicContainerList.get(i).setCoverImage(coverImageList.get(i));
//			musicContainerList.get(i).setGenre(null);
		}

		multipartFiles.clear();
		return musicContainerList;
	}

	@Transactional
	public MusicMixResponseDto mixMusic(MusicMixRequestDto requestDto) {
		log.info("***** Music Mix Start *****");
		int music_seq = requestDto.getMusic_seq();
		int preset_seq = requestDto.getPreset_seq();
		log.info("music_seq : " + music_seq);
		log.info("preset_seq : " + preset_seq);

		Music music = musicRepository.findById(music_seq).orElse(null);
		Preset preset = presetRepository.findById(preset_seq).orElse(null);

		String music_path = music.getMusicUrl().replace("https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/", "");
		String preset_path = preset.getPresetUrl().replace("https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/", "");
		log.info("music_path : " + music_path);
		log.info("preset_path : " + preset_path);

		RestTemplate restTemplate = new RestTemplate();
		String response = "";

		String url = "https://j8a403.p.ssafy.io/django/api/mix";
		String data = "{ \"music_path\" : \"" + music_path + "\", \"preset_path\" : \"" + preset_path + "\"}";

		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<?> requestMessage = new HttpEntity<>(data, headers);
			response = restTemplate.postForEntity(url, requestMessage, String.class).getBody();

			log.info("***** Music Mix Success *****");
			log.info("response : " + response);
			if(response.replace("[\"", "").replace("\"]", "").equals("FAIL")) {
				log.info("response fail : " + response.replace("[\"", "").replace("\"]", ""));
				return null;
			}
			response = response.replace("{\"music\":\"", "");
			response = response.replace("\"}", "");
			log.info("response : " + response);
			log.info("response.toString() : " + response.toString());
		} catch (HttpStatusCodeException e) {
			if(e.getStatusCode() == HttpStatus.NOT_FOUND) {
				log.info("not found");
			} else {
				return null;
			}
		}

		log.info("***** Music Mix DB 저장 *****");
		String new_music_path = "https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/" + response;
		String format = ""; 
		if(music.getMusicName().length() > 4) {
			music.getMusicName().substring(music.getMusicName().length() - 3, music.getMusicName().length());
		}
		
		System.out.println("format : " + format);
		String new_music_name = "";
		if(format.equals("mp3")) {
			new_music_name = music.getMusicName().replace(".mp3", "_mix.wav");
		} else {
			new_music_name = music.getMusicName() + "_mix";
		}
		log.info("new_music_path : " + new_music_path);
		log.info("new_music_name : " + new_music_name);

		Music new_music = new Music();

		new_music.setAlbumName(music.getAlbumName());
		new_music.setCoverImage(music.getCoverImage());
		new_music.setInst(null);
		new_music.setMixed(music);
		new_music.setGenre(music.getGenre());
		new_music.setMusicLength(music.getMusicLength());
		new_music.setMusicName(new_music_name);
		new_music.setMusicUrl(new_music_path);
		new_music.setMusicianName(music.getMusicianName());
		new_music.setUser(music.getUser());
		new_music.setPresetSeq(music.getPresetSeq());

		musicRepository.save(new_music);

//		String result = "{ \"music_url\" : \"" + music.getMusicUrl() + "\", \"mixed_music_url\" : \"" + new_music.getMusicUrl() + "\"}";
		MusicMixResponseDto responseDto = new MusicMixResponseDto(music.getMusicUrl(), new_music.getMusicUrl(), music, new_music);
		return responseDto;
	}

	@Transactional
	public Music splitMusic(Integer music_seq) {
		Music music = musicRepository.findById(music_seq).orElse(null);
		if(music != null) {
			RestTemplate restTemplate = new RestTemplate();
			String music_path = music.getMusicUrl().replace("https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/", "");
			System.out.println("music_path : " + music_path);
			String response = "";

			String url = "https://j8a403.p.ssafy.io/django/api/mix/inst";
			String data = "{ \"music_path\" : \"" + music_path + "\"}";

			try {
				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.APPLICATION_JSON);

				HttpEntity<?> requestMessage = new HttpEntity<>(data, headers);
				response = restTemplate.postForEntity(url, requestMessage, String.class).getBody();

				System.out.println("Success Music Split");
				System.out.println("response : " + response);
				response = response.replace("{\"music\":\"", "");
				response = response.replace("\"}", "");
				System.out.println("response : " + response);
				System.out.println("response.toString() : " + response.toString());
//				response = restTemplate.exchange(url, method, requestMessage, String.class).getBody();
			} catch (HttpStatusCodeException e) {
				if(e.getStatusCode() == HttpStatus.NOT_FOUND) {
					System.out.println("not found");
				} else {
					response = "API Fail";
				}
			}

			String new_music_path = "https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/" + response;
			String format = ""; 
			if(music.getMusicName().length() > 4) {
				music.getMusicName().substring(music.getMusicName().length() - 3, music.getMusicName().length());
			}
			System.out.println("format : " + format);
			String new_music_name = "";
			if(format.equals("mp3")) {
				new_music_name = music.getMusicName().replace(".mp3", "_inst.mp3");
			} else if(format.equals("wav")){
				new_music_name = music.getMusicName().replace(".wav", "_inst.wav");
			} else {
				new_music_name = music.getMusicName() + "_inst";
			}
			System.out.println("new_music_path : " + new_music_path);
			System.out.println("new_music_name : " + new_music_name);

			Music new_music = new Music();
			new_music.setAlbumName(music.getAlbumName());
			new_music.setCoverImage(music.getCoverImage());
			new_music.setInst(music);
			new_music.setMixed(null);
			new_music.setGenre(music.getGenre());
			new_music.setMusicLength(music.getMusicLength());
			new_music.setMusicName(new_music_name);
			new_music.setMusicUrl(new_music_path);
			new_music.setMusicianName(music.getMusicianName());
			new_music.setUser(music.getUser());
			new_music.setPresetSeq(null);

			

//			MusicSplitResponseDto responseDto = new MusicSplitResponseDto(new_music);
			return musicRepository.save(new_music);
		} else {
			return null;
		}
	}

	public MusicCountResponseDto countMusic(Integer user_seq) {
		
		int allCnt = musicRepository.countByUser_UserSeq(user_seq);
		log.info("***** allCnt: {} *****", allCnt);
		int originCnt = musicRepository.countByUser_UserSeqAndMixedNullAndInstNull(user_seq);
		log.info("***** originCnt: {} *****", originCnt);
		int temp = 0;
		int mixedCnt = musicRepository.countByUser_UserSeqAndMixedNotNull(user_seq);
		log.info("***** mixedCnt: {} *****", mixedCnt);
		int instCnt = musicRepository.countByUser_UserSeqAndInstNotNull(user_seq);
		log.info("***** instCnt: {} *****", instCnt);

		MusicCountResponseDto responseDto = new MusicCountResponseDto(allCnt, originCnt, mixedCnt, instCnt);
		return responseDto;
	}

}
