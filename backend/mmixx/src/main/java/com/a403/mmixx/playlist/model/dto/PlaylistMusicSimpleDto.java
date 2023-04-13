package com.a403.mmixx.playlist.model.dto;

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
public class PlaylistMusicSimpleDto {
    @JsonProperty("music_seq")
    private int musicSeq;

    @JsonProperty("sequence")
    private int sequence;
}
