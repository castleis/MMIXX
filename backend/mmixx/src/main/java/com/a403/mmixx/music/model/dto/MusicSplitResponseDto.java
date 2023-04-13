package com.a403.mmixx.music.model.dto;

import com.a403.mmixx.music.model.entity.Music;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MusicSplitResponseDto {
	private Integer userSeq;
	private String musicName;
	private String musicUrl;
	private String coverImage;
	private Integer musicLength;
	private String musicianName;
	private String albumName;
	private String genre;
	private Integer mixed;
	private Integer inst;
	private Integer presetSeq;
	
	public MusicSplitResponseDto(Music entity) {
		this.userSeq = entity.getUser().getUserSeq();
		this.musicName = entity.getMusicName();
		this.musicUrl = entity.getMusicUrl();
		this.coverImage = entity.getCoverImage();
		this.musicLength = entity.getMusicLength();
		this.musicianName = entity.getMusicianName();
		this.albumName = entity.getAlbumName();
		this.genre = entity.getGenre();
		this.mixed = null;
		this.inst = entity.getInst().getMusicSeq();
		this.presetSeq = entity.getPresetSeq();
	}
}
