package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.user.model.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.ArrayExpression;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "playlist")
public class Playlist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "playlist_seq")
	@JsonProperty
	private Integer playlistSeq;

	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "user_seq", referencedColumnName = "user_seq", nullable = false)
	@JsonProperty
//	private Integer userSeq;
	private User user;

	@NotNull
	@Column(name = "playlist_name")
	@JsonProperty
	private String playlistName;

	@NotNull
	@Column(name = "is_private")
	@JsonProperty
		private Boolean isPrivate;

//	@OneToMany(mappedBy = "playlist")
//	@JsonProperty
//	private List<PlaylistMusic> playlistMusics;

	public Playlist(int playlistSeq) {
		this.playlistSeq = playlistSeq;
	}
	public int getUserSeq() {
		return user.getUserSeq();
	}
}
