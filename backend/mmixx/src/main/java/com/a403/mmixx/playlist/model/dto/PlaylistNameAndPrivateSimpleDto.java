package com.a403.mmixx.playlist.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlaylistNameAndPrivateSimpleDto {

    @JsonProperty("playlist_name")
    private String playlistName;

    @JsonProperty("is_private")
    private boolean isPrivate;

    public Boolean getIsPrivate() {
        return isPrivate;
    }
}
