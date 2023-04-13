package com.a403.mmixx.playlist.model.dto;

import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.playlist.model.entity.Playlist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//  플레이리스트 내 음악 상세조회시 사용되는 DTO, playlist_seq 는 주어진다. (플레이리스트 내 음악 정보 + 순서 정보)
@Getter
@Setter
@NoArgsConstructor
public class PlaylistMusicDetailResponseDtoForRetrieve {

    private Integer musicSeq;
    private Integer sequence;
    private Integer userSeq;
    private String musicName;
    private String musicUrl;
    private String coverImage;
    private Integer musicLength;
    private String musicianName;
    private String albumName;
    private String genre;
    private Integer mixed;
    private Integer inst;
    private Integer presetSeq;

}
