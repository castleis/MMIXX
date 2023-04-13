package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.playlist.model.dto.PlaylistSimpleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
    List<PlaylistMusic> findByPlaylistSeq(int seq);

    List<Playlist> findByIsPrivateTrue();
    List<Playlist> findByIsPrivateFalse();

	List<PlaylistMusic> findAllByPlaylistSeq(Integer playlistSeq);

    //    List<PlaylistSimpleDto> findByIsPrivate(boolean b);
//    List<PlaylistSimpleDto> findByIsPrivateAndUserSeq(boolean b, int userSeq);
}
