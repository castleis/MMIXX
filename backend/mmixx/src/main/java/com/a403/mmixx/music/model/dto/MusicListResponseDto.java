package com.a403.mmixx.music.model.dto;

import com.a403.mmixx.music.model.entity.Music;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MusicListResponseDto {
	private Integer musicSeq;
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

	@QueryProjection
	public MusicListResponseDto(Music entity) {
		this.musicSeq = entity.getMusicSeq();
		this.musicName = entity.getMusicName();
		this.musicUrl = entity.getMusicUrl();
		this.coverImage = entity.getCoverImage();
		this.musicLength = entity.getMusicLength();
		this.musicianName = entity.getMusicianName();
		this.albumName = entity.getAlbumName();
		this.genre = entity.getGenre();
		if(entity.getMixed() != null) {
			this.mixed = entity.getMixed().getMusicSeq();
		} else {
			this.mixed = null;
		}
		if(entity.getInst() != null) {
			this.inst = entity.getInst().getMusicSeq();
		} else {
			this.inst = null;
		}
		this.presetSeq = entity.getPresetSeq();
	}
}
