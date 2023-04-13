package com.a403.mmixx.music.model.dto;

import com.a403.mmixx.music.model.entity.Music;

import lombok.Getter;

@Getter
public class MusicDetailResponseDto {
	private Integer musicSeq;
	private String musicName;
	private String musicUrl;
	private String coverImage;
	private Integer musicLength;
	private String musicianName;
	private String albumName;


	public MusicDetailResponseDto(Music entity) {
		this.musicSeq = entity.getMusicSeq();
		this.musicName = entity.getMusicName();
		this.musicUrl = entity.getMusicUrl();
		this.coverImage = entity.getCoverImage();
		this.musicLength = entity.getMusicLength();
		this.musicianName = entity.getMusicianName();
		this.albumName = entity.getAlbumName();
	}
}
