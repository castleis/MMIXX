package com.a403.mmixx.preset.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a403.mmixx.preset.model.service.PresetService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"프리셋", "api"})
@RestController
@RequestMapping("/preset")
@RequiredArgsConstructor
public class PresetController {
	private final PresetService presetService;
	
	@ApiOperation(value = "프리셋 전체 조회")
	@GetMapping()
	public ResponseEntity<?> findAllPreset() {
		return ResponseEntity.ok(presetService.findAllPreset());
	}
	
	@ApiOperation(value = "프리셋 한개 조회")
	@GetMapping("/{preset_seq}")
	public ResponseEntity<?> findPreset(@PathVariable Integer preset_seq) {
		return ResponseEntity.ok(presetService.findPreset(preset_seq));
	}
}
