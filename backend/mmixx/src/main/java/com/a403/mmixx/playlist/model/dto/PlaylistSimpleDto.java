package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.user.model.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

// 플레이리스트의 간단한 DTO, playlist_seq 으로 물고있는
//     private LinkedList<PlaylistMusicDto> playlistMusic;
// 를 포함하지 않는다.

@Getter
@Setter
@NoArgsConstructor
public class PlaylistSimpleDto {

    private Integer playlistSeq;

    private Integer userSeq;

    private String playlistName;

    private Boolean isPrivate;

}
