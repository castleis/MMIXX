package com.a403.mmixx.playlist.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlaylistWithFavoriteSimpleDto {

    private Integer playlistSeq;

    private Integer userSeq;

    private String playlistName;

    private Boolean isPrivate;

    private Boolean isFavorite;

}
