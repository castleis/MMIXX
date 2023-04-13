package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.music.model.service.MusicService;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.JsonObject;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlaylistMusicDto {

    @JsonProperty("playlist_seq")
    private int playlistSeq;

    @JsonProperty("music_seq")
    private int musicSeq;

    @JsonProperty("sequence")
    private int sequence;

    @Builder
    public PlaylistMusicDto(PlaylistMusic entity){
        this.playlistSeq = entity.getPlaylistSeq();
        this.musicSeq = entity.getMusicSeq();
//        this.musicSeq = entity.getMusic().getMusicSeq();
        this.sequence = entity.getSequence();
    }

    public PlaylistMusicDto(JsonObject playlistMusicJsonObject) {
        this.playlistSeq = playlistMusicJsonObject.get("playlist_seq").getAsInt();
        this.musicSeq = playlistMusicJsonObject.get("music_seq").getAsInt();
        this.sequence = playlistMusicJsonObject.get("sequence").getAsInt();
    }

}
