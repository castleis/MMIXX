package com.a403.mmixx.playlist.model.entity;

import com.a403.mmixx.music.model.entity.Music;
import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedList;

@Entity
@Getter
@Setter
@Table(name = "playlist_music")
public class PlaylistMusic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer playlistMusicSeq;

//    @ManyToOne(targetEntity = Playlist.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "playlist_seq")
//    private Integer playlistSeq;

    @ManyToOne(targetEntity = Playlist.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_seq", referencedColumnName = "playlist_seq", nullable = false)
    private Playlist playlist;

    @ManyToOne(targetEntity = Music.class, fetch = FetchType.LAZY)
//    Unable to find column with logical name: music_seq in org.hibernate.mapping.Table(music) and its related supertables and secondary tables
//    @JoinColumn(name = "music_seq", referencedColumnName = "music_seq", nullable = false)
    @JoinColumn(name = "music_seq", referencedColumnName = "music_seq", nullable = false)
    private Music music;

//    @ManyToOne(targetEntity = Music.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "music_seq")
//    private Integer musicSeq;

    @NotNull
    @Column(name = "sequence")
    private Integer sequence;

    public int getPlaylistSeq() {
        return playlist.getPlaylistSeq();
    }

    public int getMusicSeq() {
        return music.getMusicSeq();
    }
}
