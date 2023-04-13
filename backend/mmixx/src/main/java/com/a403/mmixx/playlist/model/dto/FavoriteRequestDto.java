package com.a403.mmixx.playlist.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class FavoriteRequestDto {
	private Integer userSeq;
	private Integer playlistSeq;
}
