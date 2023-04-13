package com.a403.mmixx.music.controller;

import java.io.IOException;
import java.util.List;

import com.amazonaws.http.apache.request.impl.HttpGetWithBody;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicCountResponseDto;
import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.dto.MusicMixRequestDto;
import com.a403.mmixx.music.model.dto.MusicMixResponseDto;
import com.a403.mmixx.music.model.dto.MusicRegistRequestDto;
import com.a403.mmixx.music.model.dto.MusicSplitResponseDto;
import com.a403.mmixx.music.model.dto.MusicUpdateRequestDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.service.AwsS3Service;
import com.a403.mmixx.music.model.service.MusicService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Api(tags = {"음악", "api"})
@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {
    private final MusicService musicService;
    private final AwsS3Service awsS3Service;

	//	Send REST API request to Django python server for AI processing
	@ApiOperation(value = "음악 스타일 변환", notes = "")
	@PostMapping("/mix")
	public ResponseEntity<?> mixMusic(@RequestBody MusicMixRequestDto requestDto) throws Exception {
		MusicMixResponseDto response = musicService.mixMusic(requestDto);
		if(response != null) {
			return ResponseEntity.ok(response);
		} else {
//			return ResponseEntity.notFound().build();
			return ResponseEntity.ok("FAIL");
		}
	}

	@ApiOperation(value = "음악 다운로드", notes = "")
	@GetMapping("/download/{music_seq}")
	public ResponseEntity<byte[]> downloadMusic(@PathVariable Integer music_seq) throws IOException {
		return awsS3Service.downloadMusic(music_seq);
	}

	@ApiOperation(value = "음악 배경음 추출(보컬 제거)")
	@GetMapping("/inst/{music_seq}")
	public ResponseEntity<?> splitMusic(@PathVariable Integer music_seq) throws Exception {
		Music response = musicService.splitMusic(music_seq);
		if(response != null) {
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@ApiOperation(value = "음악 리스트 조회", notes = "user_seq로 회원의 모든 음악 조회")
	@GetMapping("/{user_seq}")
	public ResponseEntity<Page<MusicListResponseDto>> getMusicList(@PathVariable Integer user_seq, @PageableDefault(size=10) Pageable pageable) {
		return ResponseEntity.ok(musicService.getMusicList(pageable, user_seq));
	}

	@ApiOperation(value = "음악 검색", notes = "")
	@GetMapping("/search/{user_seq}")
	public ResponseEntity<Page<MusicListResponseDto>> getMusicListByCondition(@PathVariable Integer user_seq, MusicCondition condition, @PageableDefault(size=10) Pageable pageable) {
		return ResponseEntity.ok(musicService.getMusicListByCondition(user_seq, condition, pageable));
	}

	@ApiOperation(value = "음악 상세 내용 조회", notes = "")
	@GetMapping("/detail/{seq}")
	public ResponseEntity<MusicDetailResponseDto> getMusic(@PathVariable Integer seq) {
		return ResponseEntity.ok(musicService.getMusic(seq));
	}

	@ApiOperation(value = "음악 업로드", notes = "")
	@PostMapping
	public ResponseEntity<?> registMusic(@RequestPart("user") MusicRegistRequestDto user, @RequestPart("files") List<MultipartFile> multipartFiles) throws Exception {
		// 200 : 업로드 성공
		// 401 : (권한 없음)
		// 413 : 파일 용량 초과
		// 415 : 지원하지 않는 확장자
		// 500 : 업로드 실패
		return ResponseEntity.ok(musicService.registMusic(user, multipartFiles));
	}

	@ApiOperation(value = "음악 제목 수정", notes = "")
	@PutMapping("/{seq}")
	public ResponseEntity<?> updateMusic(@PathVariable Integer seq, @RequestBody MusicUpdateRequestDto reqeustDto) {
		Music music = musicService.updateMusic(seq, reqeustDto);
		if (music != null) {
			return ResponseEntity.ok(seq);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@ApiOperation(value = "음악 삭제", notes = "")
	@DeleteMapping("/{music_seq}")
	public ResponseEntity<?> deleteMusic(@PathVariable Integer music_seq) {
		Music music = musicService.deleteMusic(music_seq);
		if (music != null) {
			return ResponseEntity.ok("SUCCESS");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@ApiOperation(value = "음악 개수 조회", notes = "user_seq로 회원의 조건별 음원 개수 조회")
	@GetMapping("/count/{user_seq}")
	public ResponseEntity<?> countMusic(@PathVariable Integer user_seq) {
		MusicCountResponseDto responseDto = musicService.countMusic(user_seq);
		return ResponseEntity.ok(responseDto);
	}

}
