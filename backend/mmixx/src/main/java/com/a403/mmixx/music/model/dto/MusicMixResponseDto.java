package com.a403.mmixx.music.model.dto;

import com.a403.mmixx.music.model.entity.Music;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MusicMixResponseDto {
	private String music_url;
	private String mixed_music_url;
	private Music origin_music;
	private Music mixed_music;
}
