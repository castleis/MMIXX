package com.a403.mmixx.music.model.service;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.entity.MusicRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import lombok.RequiredArgsConstructor;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsS3Service {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3 amazonS3;
	private final MusicRepository musicRepository;
	private final String MUSIC_FOLDER = "/music";
	private final String IMAGE_FOLDER = "/images";

	public ResponseEntity<byte[]> downloadMusic(int music_seq) throws IOException {
		Music music = musicRepository.findById(music_seq).orElse(null);
		log.info("music name : " + music.getMusicName());

		String music_url = music.getMusicUrl().replace("https://s3.ap-northeast-2.amazonaws.com/bucket-mp3-file-for-mmixx/", "");
		log.info("music_url : " + music_url);

		S3Object s3Object = amazonS3.getObject(new GetObjectRequest(bucket, music_url));
		S3ObjectInputStream objectInputStream = s3Object.getObjectContent();
		byte[] bytes = IOUtils.toByteArray(objectInputStream);

		String downloadFileName = URLEncoder.encode(music.getMusicName(), "UTF-8").replaceAll("\\+", "%20");
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		httpHeaders.setContentLength(bytes.length);
		httpHeaders.setContentDispositionFormData("attachment", downloadFileName); // 파일 이름 지정
		
		objectInputStream.close();
		return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
	}


	public List<String> uploadMusicToS3(List<MultipartFile> multipartFiles) {
		List<String> fileList = new ArrayList<>();

		// forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
		multipartFiles.forEach(file -> {
			String fileName = createFileName(file.getOriginalFilename());
			System.out.println("uploadMusicToS3 fileName : " + fileName);
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(file.getSize());
			metadata.setContentType(file.getContentType());

			try (InputStream inputStream = file.getInputStream()) {
				amazonS3.putObject(new PutObjectRequest(bucket + MUSIC_FOLDER, fileName, inputStream, metadata)
						.withCannedAcl(CannedAccessControlList.PublicRead));
				inputStream.close();
			} catch (IOException e) {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "음원 파일 업로드에 실패했습니다.");
			}

			// fileList.add(fileName);
			fileList.add(amazonS3.getUrl(bucket + MUSIC_FOLDER, fileName).toString());
		});

		return fileList;
	}


	public List<String>[] uploadCoverImageToS3(List<MultipartFile> multipartFiles) {
		System.out.println("uploadCoverImageToS3 START");
		List<String>[] result = new List[2];
		List<String> fileList = new ArrayList<>();
		List<String> tempfilepath = new ArrayList<>();
		
		// forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
		multipartFiles.forEach(file -> {
			byte[] coverImage = null;
			// extract cover image from mp3 file using MP3AlbumArtworkService.extractAlbumArtwork()
			
			
			try {
				File mp3File = Files.createTempFile("temp", ".mp3").toFile();
		        file.transferTo(mp3File);
		        System.out.println("extract Album Art mp3File absolute path : " + mp3File.getAbsolutePath());
				tempfilepath.add(mp3File.getAbsolutePath());
		        coverImage = MP3AlbumArtworkService.extractAlbumArtwork(mp3File);
			} catch (IOException e) {
				e.printStackTrace();
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "커버 이미지 업로드에 실패했습니다.");
			} catch (CannotReadException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} catch (TagException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} catch (InvalidAudioFrameException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} catch (ReadOnlyFileException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}


			String fileName = createFileName(file.getOriginalFilename() + "_artwork.jpg");
			System.out.println("fileName : " + fileName);
			
			ObjectMetadata metadata = new ObjectMetadata();
			//	setContentType to .jpg
			metadata.setContentType("image/jpeg");
			//	byte[] to InputStream
			try(InputStream inputStream = new ByteArrayInputStream(coverImage)) {
				amazonS3.putObject(new PutObjectRequest(bucket + IMAGE_FOLDER, fileName, inputStream, metadata)
						.withCannedAcl(CannedAccessControlList.PublicRead));
				inputStream.close();
			} catch (IOException e) {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "커버 이미지 업로드에 실패했습니다.");
			}

			fileList.add(amazonS3.getUrl(bucket + IMAGE_FOLDER, fileName).toString());
		});
		result[0] = fileList;
		result[1] = tempfilepath;
		return result;
	}


	public void deleteMusic(String fileName) {
		// amazonS3.deleteObject(bucket, fileName);
		System.out.println("AWS S3 filename : " + fileName);
		amazonS3.deleteObject(new DeleteObjectRequest(bucket, "music/" + fileName));
		
//		amazonS3.deleteObject(new DeleteObjectRequest(bucket + "/music", fileName));
	}


	private MediaType contentType(String keyName) {
		String[] arr = keyName.split("\\.");
		String type = arr[arr.length - 1];
		switch (type) {
			case "png":
				return MediaType.IMAGE_PNG;
			case "jpg":
				return MediaType.IMAGE_JPEG;
			default:
				return MediaType.APPLICATION_OCTET_STREAM;
		}
	}

	private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}


	private String getFileExtension(String fileName) { // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였습니다.
		try {
			return fileName.substring(fileName.lastIndexOf("."));
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}
	
}
