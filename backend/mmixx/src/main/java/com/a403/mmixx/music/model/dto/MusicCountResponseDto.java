package com.a403.mmixx.music.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MusicCountResponseDto {
	private Integer allCnt;
	private Integer originCnt;
	private Integer mixedCnt;
	private Integer instCnt;
}
