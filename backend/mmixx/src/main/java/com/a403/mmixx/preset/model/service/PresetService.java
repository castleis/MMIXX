package com.a403.mmixx.preset.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.a403.mmixx.preset.model.entity.Preset;
import com.a403.mmixx.preset.model.entity.PresetRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PresetService {
	private final PresetRepository presetRepository;
	
	public List<Preset> findAllPreset() {
		log.info("******* 모든 프리셋 조회 *******");
		return presetRepository.findAll();
	}
	
	public Preset findPreset(Integer preset_seq) {
		log.info("******* 프리셋 한개 조회 *******");
		return presetRepository.findById(preset_seq).orElse(null);
	}
}
