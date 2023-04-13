package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.playlist.model.entity.Playlist;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.swing.text.html.parser.Entity;
import java.util.LinkedList;
import java.util.List;

// 플레이리스트의 DTO
@Getter
@Setter
@NoArgsConstructor
public class PlaylistDto {
    @JsonProperty("playlist_name")
    private String playlistName;

    @JsonProperty("is_private")
    private boolean isPrivate;

    @JsonProperty("user_seq")
    private int userSeq;

    @JsonProperty("playlist_music")
    private LinkedList<PlaylistMusicDto> playlistMusic;

    public PlaylistDto(Playlist entity) {
        this.playlistName = entity.getPlaylistName();
        this.isPrivate = entity.getIsPrivate();
//        this.userSeq = entity.getUserSeq();
        this.userSeq = entity.getUser().getUserSeq();
        this.playlistMusic = new LinkedList<>();
    }

    public PlaylistDto(JsonObject jsonObject, int userSeq) {
        this.playlistName = jsonObject.get("playlist_name").getAsString();
        this.isPrivate = jsonObject.get("is_private").getAsBoolean();
        this.userSeq = userSeq;
        this.playlistMusic = new LinkedList<>();
        JsonArray jsonArray = jsonObject.get("playlist_music").getAsJsonArray();
        for (int i = 0; i < jsonArray.size(); i++) {
            JsonObject playlistMusicJsonObject = jsonArray.get(i).getAsJsonObject();
            PlaylistMusicDto playlistMusicDto = new PlaylistMusicDto(playlistMusicJsonObject);
            this.playlistMusic.add(playlistMusicDto);
        }
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }
}
