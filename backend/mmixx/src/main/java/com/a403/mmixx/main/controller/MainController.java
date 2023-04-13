package com.a403.mmixx.main.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a403.mmixx.music.model.dto.MusicDetailResponseDto;

@RestController
public class MainController {
	@GetMapping("/")
	public ResponseEntity main() {
		return ResponseEntity.ok().build();
	}
}
