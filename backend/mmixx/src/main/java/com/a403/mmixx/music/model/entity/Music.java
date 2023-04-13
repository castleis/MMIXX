package com.a403.mmixx.music.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;

import com.a403.mmixx.music.model.dto.MusicUpdateRequestDto;
import com.a403.mmixx.preset.model.entity.Preset;
import com.a403.mmixx.user.model.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@DynamicInsert
public class Music {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "music_seq")
	private Integer musicSeq;
	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "user_seq", nullable = false)
	private User user;
	@Column(length = 100, nullable = false)
	private String musicName;
	@Column(length = 500, nullable = false)
	private String musicUrl;
	@Column(length = 500)
	private String coverImage;
	@Column(nullable = false)
	private Integer musicLength;
	@Column(length = 100)
	private String musicianName;
	@Column(length = 100)
	private String albumName;
	@Column(length = 100)
	private String genre;
	@ManyToOne(targetEntity = Music.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "mixed", referencedColumnName = "music_seq", nullable = true)
	private Music mixed;
	@ManyToOne(targetEntity = Music.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "inst", referencedColumnName = "music_seq", nullable = true)
	private Music inst;
	@ManyToOne(targetEntity = Preset.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "presetSeq", nullable = true)
	private Integer presetSeq;

	public void updateMusic(MusicUpdateRequestDto requestDto){
		this.musicName = requestDto.getMusicName();
	}

}
