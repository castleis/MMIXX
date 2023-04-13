package com.a403.mmixx.playlist.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FindFavoriteDto {

	private Integer favoriteSeq;

	private Integer userSeq;

	private Integer playlistSeq;

	private String playlistName;

	private Boolean isPrivate;
}
