package com.a403.mmixx.music.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MixResponseDto {
	private boolean result;
	private String music_path;
	private String preset_path;
}
