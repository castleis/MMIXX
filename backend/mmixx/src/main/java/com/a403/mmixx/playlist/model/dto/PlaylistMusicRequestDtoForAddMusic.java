package com.a403.mmixx.playlist.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

//  플레이리스트에 음악 추가시 사용되는 DTO
@Getter
@Setter
@NoArgsConstructor
public class PlaylistMusicRequestDtoForAddMusic {

    //  기존 플레이리스트에 있던 곡들의 리스트
    @JsonProperty("playlist_music")
    private List<PlaylistMusicSimpleDto> oriPlaylistMusicDtoList;

    //  추가할 곡의 리스트
    @JsonProperty("add_music")
    private List<PlaylistMusicSimpleDto> addPlaylistMusicDtoList;

    public List<PlaylistMusicSimpleDto> getPlaylistMusic() {
        return oriPlaylistMusicDtoList;
    }

    public List<PlaylistMusicSimpleDto> getAddMusic() {
        return addPlaylistMusicDtoList;
    }
}
