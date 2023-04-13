package com.a403.mmixx.playlist.model.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
	Favorite findByUser_UserSeqAndPlaylist_PlaylistSeq(int user_seq, int playlist_seq);
	void deleteByUser_UserSeqAndPlaylist_PlaylistSeq(int user_seq, int playlist_seq);
	List<Favorite> findAllByUser_UserSeq(int user_seq);
}
