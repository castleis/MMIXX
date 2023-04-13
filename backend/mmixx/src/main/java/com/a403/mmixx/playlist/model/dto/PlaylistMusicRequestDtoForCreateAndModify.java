package com.a403.mmixx.playlist.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//  플레이리스트 생성 및 수정시 사용되는 DTO
@Getter
@Setter
@NoArgsConstructor
public class PlaylistMusicRequestDtoForCreateAndModify {
    @JsonProperty("playlist_name")
    private String playlistName;
    @JsonProperty("is_private")
    private boolean isPrivate;
    @JsonProperty("user_seq")
    private int userSeq;
    @JsonProperty("playlist_music")
    private List<PlaylistMusicDto> playlistMusicDtoList;

    public PlaylistMusicRequestDtoForCreateAndModify(String playlistName, boolean isPrivate, int userSeq, List<PlaylistMusicDto> playlistMusicDtoList) {
        this.playlistName = playlistName;
        this.isPrivate = isPrivate;
        this.userSeq = userSeq;
        this.playlistMusicDtoList = playlistMusicDtoList;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public List<PlaylistMusicDto> getPlaylistMusic() {
        return playlistMusicDtoList;
    }
}
