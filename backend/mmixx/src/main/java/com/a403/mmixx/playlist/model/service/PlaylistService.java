package com.a403.mmixx.playlist.model.service;

import com.a403.mmixx.music.model.entity.Music;
import com.a403.mmixx.playlist.model.dto.*;
//import com.a403.mmixx.playlist.model.dto.PlaylistMusicListResponseDto;
import com.a403.mmixx.playlist.model.dto.FindFavoriteDto;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.entity.MusicRepository;

import com.a403.mmixx.playlist.model.entity.Favorite;
import com.a403.mmixx.playlist.model.entity.FavoriteRepository;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.entity.PlaylistMusic;
import com.a403.mmixx.playlist.model.entity.PlaylistMusicRepository;
import com.a403.mmixx.playlist.model.entity.PlaylistRepository;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private PlaylistMusicRepository playlistMusicRepository;

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    //  JSON from Frontend - Example
    /*
    {
    "playlist_name":"플리이름",
    "is_private":true,
    "user_seq":6,
    "playlist_music":[
        {
            "music_seq":1,
            "sequence":1
        },
        {
            "music_seq":2,
            "sequence":2
        }
    ]
    }
     */

    /**
     * 빈 플레이리스트 생성 + 생성된 플레이리스트에 곡 리스트 추가한 후 DB 저장까지
     *
     * @param requestDto
     * @param userSeq
     */
    @Transactional
    public Integer createPlaylist(@RequestBody PlaylistDto requestDto, int userSeq) {

        // check requestDto got from frontend
        log.info("requestDto: " + requestDto);
        log.info("playlistName: " + requestDto.getPlaylistName());
        log.info("isPrivate: " + requestDto.getIsPrivate());
        log.info("userSeq: " + requestDto.getUserSeq());
        log.info("playlistMusic: " + requestDto.getPlaylistMusic());


        //  PART1: empty playlist create
        Playlist newPlaylist = new Playlist();
        newPlaylist.setPlaylistName(requestDto.getPlaylistName());
        newPlaylist.setIsPrivate(requestDto.getIsPrivate());
        newPlaylist.setUser(userRepository.findById(userSeq).orElse(null));
        playlistRepository.save(newPlaylist);
        log.info("[1/6] !!empty playlist created successfully!!");

        // get last increment playlist_seq
        Integer playlistSeq = newPlaylist.getPlaylistSeq();
        log.info("playlistSeq: " + playlistSeq);
        log.info("[2/6]!!playlistSeq(id) Retrieved successfully!!");

        //  PART2: playlist_music create
        List<PlaylistMusicDto> playlistMusicList = requestDto.getPlaylistMusic();

        for (int i = 0; i < playlistMusicList.size(); i++) {
            PlaylistMusic newPlaylistMusic = new PlaylistMusic();

//"org.springframework.orm.jpa.JpaSystemException: Error accessing field [private java.lang.Integer com.a403.mmixx.music.model.entity.Music.musicSeq] by reflection for persistent property
//            newPlaylistMusic.setPlaylistSeq(playlistSeq);
//            newPlaylistMusic.setSequence(playlistMusicList.get(i).getSequence());
//            newPlaylistMusic.setMusicSeq(playlistMusicList.get(i).getMusicSeq());

            newPlaylistMusic.setPlaylist(playlistRepository.findById(playlistSeq).orElse(null));
            log.info("[3/6] !!playlistMusic object from JSON setting done!!");
            newPlaylistMusic.setMusic(musicRepository.findById(playlistMusicList.get(i).getMusicSeq()).orElse(null));
            log.info("[4/6] !!music_seq setting done!!");
            newPlaylistMusic.setSequence(playlistMusicList.get(i).getSequence());
            log.info("[5/6] !!sequence setting done!!");
            playlistMusicRepository.save(newPlaylistMusic);
            log.info("[6/6] !!playlistMusic objects (list) saved successfully!!");
        }

        System.out.println("!!playlistSeq returned successfully!!: " + playlistSeq);
        return playlistSeq;
    }


    /**
     * 플레이리스트에 곡 추가
     *
     * @return
     */
    /*
    JSON Example
    {
    "playlist_music":[
        {
            "musicSeq":1,
            "sequence":1
        },
        {
            "musicSeq":2,
            "sequence":2
        }
    ],
    "add_music":[
        {
            "musicSeq":70,
            "sequence":4
        },
        {
            "musicSeq":74,
            "sequence":3
        }
    ]
    }
     */
    @Transactional
    public String addMusicToPlaylist(PlaylistMusicRequestDtoForAddMusic requestDto, String playlistSeq, String userSeq) {

        // get requestDto
        List<PlaylistMusicSimpleDto> oriPlaylistMusicDtoList = requestDto.getPlaylistMusic();
        List<PlaylistMusicSimpleDto> addPlaylistMusicDtoList = requestDto.getAddMusic();
        log.info("oriPlaylistMusicDtoList: " + oriPlaylistMusicDtoList);
        log.info("addPlaylistMusicDtoList: " + addPlaylistMusicDtoList);

        // get max sequence number from oriPlaylistMusicDtoList
        int maxSequence = 0;
        for (int i = 0; i < oriPlaylistMusicDtoList.size(); i++) {
            if (maxSequence < oriPlaylistMusicDtoList.get(i).getSequence()) {
                maxSequence = oriPlaylistMusicDtoList.get(i).getSequence();
            }
        }

        // update sequence number of addPlaylistMusicDtoList (add maxSequence)
        for (int i = 0; i < addPlaylistMusicDtoList.size(); i++) {
            addPlaylistMusicDtoList.get(i).setSequence(
                    maxSequence + addPlaylistMusicDtoList.get(i).getSequence());
        }

        // save addPlaylistMusicDtoList to DB
        for (int i = 0; i < addPlaylistMusicDtoList.size(); i++) {
            PlaylistMusic newPlaylistMusic = new PlaylistMusic();
            newPlaylistMusic.setPlaylist(playlistRepository.findById(Integer.parseInt(playlistSeq)).orElse(null));
            newPlaylistMusic.setMusic(musicRepository.findById(addPlaylistMusicDtoList.get(i).getMusicSeq()).orElse(null));
            newPlaylistMusic.setSequence(addPlaylistMusicDtoList.get(i).getSequence());
            playlistMusicRepository.save(newPlaylistMusic);
        }
        return "addMusicToPlaylist success";
    }

    /**
     * (관리자용) private 여부 상관없이 모든 유저의 모든 플레이리스트를 조회
     */
    public List<PlaylistSimpleDto> getAllPlaylist(int userSeq) {
        // check User.Role
        User user = userRepository.findById(userSeq).orElse(null);
        if (user.getRole().equals("ADMIN")) {
            List<PlaylistSimpleDto> playlistSimpleDtoList = new LinkedList<>();
            List<Playlist> playlistList = playlistRepository.findAll();
            for (int i = 0; i < playlistList.size(); i++) {
                PlaylistSimpleDto playlistSimpleDto = new PlaylistSimpleDto();
                playlistSimpleDto.setPlaylistSeq(playlistList.get(i).getPlaylistSeq());
                playlistSimpleDto.setPlaylistName(playlistList.get(i).getPlaylistName());
                playlistSimpleDto.setIsPrivate(playlistList.get(i).getIsPrivate());
                playlistSimpleDto.setUserSeq(playlistList.get(i).getUserSeq());
                playlistSimpleDtoList.add(playlistSimpleDto);
            }
            return playlistSimpleDtoList;
        } else {
            return null;
        }
    }


    /**
     * Public 플레이리스트 조회, isPrivate = false 인 모든 항목을 조회한다.
     * ignore userSeq
     */
    public List<PlaylistWithFavoriteSimpleDto> getGlobalPlaylist(int userSeq) {
        List<PlaylistWithFavoriteSimpleDto> playlistWithFavoriteSimpleDtoList = new LinkedList<>();
        List<Playlist> playlistList = playlistRepository.findByIsPrivateFalse();

        favoriteRepository.findAll();

        for (int i = 0; i < playlistList.size(); i++) {
            PlaylistWithFavoriteSimpleDto playlistWithFavoriteSimpleDto = new PlaylistWithFavoriteSimpleDto();

            playlistWithFavoriteSimpleDto.setPlaylistSeq(playlistList.get(i).getPlaylistSeq());
            playlistWithFavoriteSimpleDto.setPlaylistName(playlistList.get(i).getPlaylistName());
            playlistWithFavoriteSimpleDto.setIsPrivate(playlistList.get(i).getIsPrivate());
            playlistWithFavoriteSimpleDto.setUserSeq(playlistList.get(i).getUserSeq());

            // set favorite status
            Favorite favorite = favoriteRepository.findByUser_UserSeqAndPlaylist_PlaylistSeq(userSeq, playlistList.get(i).getPlaylistSeq());
            if (favorite != null) {
                playlistWithFavoriteSimpleDto.setIsFavorite(true);
            } else {
                playlistWithFavoriteSimpleDto.setIsFavorite(false);
            }

            playlistWithFavoriteSimpleDtoList.add(playlistWithFavoriteSimpleDto);

        }
        return playlistWithFavoriteSimpleDtoList;
    }


    /**
     * 유저 ID로 플레이리스트 조회 (userSeq 필요), 해당 user 가 생성한 private + public 플레이리스트를 조회한다.
     */
    public List<PlaylistWithFavoriteSimpleDto> getPrivatePlaylist(int userSeq) {
        List<PlaylistWithFavoriteSimpleDto> playlistWithFavoriteSimpleDtoList = new LinkedList<>();
//        List<Playlist> playlistList = playlistRepository.findByIsPrivateTrue();

        List<Playlist> playlistList = playlistRepository.findAll();
        for (int i = 0; i < playlistList.size(); i++) {
            if (playlistList.get(i).getUserSeq() == userSeq) {
                PlaylistWithFavoriteSimpleDto playlistWithFavoriteSimpleDto = new PlaylistWithFavoriteSimpleDto();
                playlistWithFavoriteSimpleDto.setPlaylistSeq(playlistList.get(i).getPlaylistSeq());
                playlistWithFavoriteSimpleDto.setPlaylistName(playlistList.get(i).getPlaylistName());
                playlistWithFavoriteSimpleDto.setIsPrivate(playlistList.get(i).getIsPrivate());
                playlistWithFavoriteSimpleDto.setUserSeq(playlistList.get(i).getUserSeq());

                // set favorite status
                Favorite favorite = favoriteRepository.findByUser_UserSeqAndPlaylist_PlaylistSeq(userSeq, playlistList.get(i).getPlaylistSeq());
                if (favorite != null) {
                    playlistWithFavoriteSimpleDto.setIsFavorite(true);
                } else {
                    playlistWithFavoriteSimpleDto.setIsFavorite(false);
                }

                playlistWithFavoriteSimpleDtoList.add(playlistWithFavoriteSimpleDto);
            }
        }
        return playlistWithFavoriteSimpleDtoList;
    }



    /**
     * 플레이리스트에 속한 노래 목록 조회, playlistSeq 필요
     */
    public List<PlaylistMusicDetailResponseDtoForRetrieve> getMusicListInPlaylist(int playlistSeq) {

        //  최종적으로 전달해야 할, 플레이리스트 안에 들어있는 음악들의 목록
        List<PlaylistMusicDetailResponseDtoForRetrieve> musicListInthePlaylist = new LinkedList<>();

        //  플레이리스트에 속해있는 음악들의 순서정보(musicSeq, sequence)를 담은 리스트
        List<PlaylistMusicDto> playlistMusicDtoList = new LinkedList<>();

        //  플레이리스트에 들어있는 개별 음악의 상세정보
        List<MusicListResponseDto> musicListResponseDtoList = new LinkedList<>();

        Playlist playlist = playlistRepository.findById(playlistSeq).orElse(null);

        if (playlist == null) {
            log.info("플레이리스트가 비어있습니다.");
            return null;
        }

        //  playlistSeq 로 playlistMusic 테이블에서 musicSeq, sequence 를 조회
        List<PlaylistMusic> playlistMusicList = playlistMusicRepository.findAll();


        for (int i = 0; i < playlistMusicList.size(); i++) {
            if (playlistMusicList.get(i).getPlaylistSeq() == playlistSeq) {
                PlaylistMusicDto playlistMusicDto = new PlaylistMusicDto();
                playlistMusicDto.setPlaylistSeq(playlistMusicList.get(i).getPlaylistSeq());
                playlistMusicDto.setMusicSeq(playlistMusicList.get(i).getMusicSeq());
                playlistMusicDto.setSequence(playlistMusicList.get(i).getSequence());
                playlistMusicDtoList.add(playlistMusicDto);
            }
        }

        //  musicSeq 로 music 테이블에서 개별 음악의 상세정보를 조회
        for (int i = 0; i < playlistMusicDtoList.size(); i++) {
            MusicListResponseDto musicListResponseDto = new MusicListResponseDto();
            Music music = musicRepository.findById(playlistMusicDtoList.get(i).getMusicSeq()).orElse(null);
            musicListResponseDto.setMusicName(music.getMusicName());
            musicListResponseDto.setMusicUrl(music.getMusicUrl());
            musicListResponseDto.setCoverImage(music.getCoverImage());
            musicListResponseDto.setMusicLength(music.getMusicLength());
            musicListResponseDto.setMusicianName(music.getMusicianName());
            musicListResponseDto.setAlbumName(music.getAlbumName());
            musicListResponseDto.setGenre(music.getGenre());
            if (music.getMixed() == null) {
                musicListResponseDto.setMixed(null);
            } else {
                musicListResponseDto.setMixed(music.getMixed().getMusicSeq());
            }
            if (music.getInst() == null) {
                musicListResponseDto.setInst(null);
            } else {
                musicListResponseDto.setInst(music.getInst().getMusicSeq());
            }
            musicListResponseDto.setPresetSeq(music.getPresetSeq());
            musicListResponseDtoList.add(musicListResponseDto);
        }

        //  musicListResponseDtoList 에서 개별 음악의 상세정보를 뽑아서, PlaylistMusicDetailResponseDtoForRetrieve 에 담는다.
        for (int i = 0; i < musicListResponseDtoList.size(); i++) {
            PlaylistMusicDetailResponseDtoForRetrieve playlistMusicDetailResponseDtoForRetrieve = new PlaylistMusicDetailResponseDtoForRetrieve();
            playlistMusicDetailResponseDtoForRetrieve.setMusicSeq(playlistMusicDtoList.get(i).getMusicSeq());
            playlistMusicDetailResponseDtoForRetrieve.setSequence(playlistMusicDtoList.get(i).getSequence());
            playlistMusicDetailResponseDtoForRetrieve.setMusicName(musicListResponseDtoList.get(i).getMusicName());
            playlistMusicDetailResponseDtoForRetrieve.setMusicUrl(musicListResponseDtoList.get(i).getMusicUrl());
            playlistMusicDetailResponseDtoForRetrieve.setCoverImage(musicListResponseDtoList.get(i).getCoverImage());
            playlistMusicDetailResponseDtoForRetrieve.setMusicLength(musicListResponseDtoList.get(i).getMusicLength());
            playlistMusicDetailResponseDtoForRetrieve.setMusicianName(musicListResponseDtoList.get(i).getMusicianName());
            playlistMusicDetailResponseDtoForRetrieve.setAlbumName(musicListResponseDtoList.get(i).getAlbumName());
            playlistMusicDetailResponseDtoForRetrieve.setGenre(musicListResponseDtoList.get(i).getGenre());
            playlistMusicDetailResponseDtoForRetrieve.setMixed(musicListResponseDtoList.get(i).getMixed());
            playlistMusicDetailResponseDtoForRetrieve.setInst(musicListResponseDtoList.get(i).getInst());
            playlistMusicDetailResponseDtoForRetrieve.setPresetSeq(musicListResponseDtoList.get(i).getPresetSeq());
            musicListInthePlaylist.add(playlistMusicDetailResponseDtoForRetrieve);
        }

        return musicListInthePlaylist;
    }



    /**
     * 플레이리스트 삭제 (playlist 에 포함된 music 까지 cascade)
     */
    public String deletePlaylist(int playlistSeq) {
    	log.info("해당 playlist 전체 삭제 시작");
        log.info("playlistSeq : " + playlistSeq + "번호에 해당하는 플레이리스트에 속한 모든 곡들 삭제");
        List<PlaylistMusic> playlistMusicList = playlistMusicRepository.findAll();
        for (int i = 0; i < playlistMusicList.size(); i++) {
            if (playlistMusicList.get(i).getPlaylistSeq() == playlistSeq) {
                playlistMusicRepository.deleteById(playlistMusicList.get(i).getPlaylistMusicSeq());
            }
        }
        log.info("playlistSeq : " + playlistSeq + "번호에 해당하는 플레이리스트 자체 삭제");
        playlistRepository.deleteById(playlistSeq);
        return "success";
    }
    
    public String deleteDetailMusicPlaylist(int playlist_music_seq) {
    	log.info("해당 playlist 개별 삭제 시작");
        log.info("playlistMusicSeq : " + playlist_music_seq + "번호에 해당하는 곡 삭제");
        PlaylistMusic music = playlistMusicRepository.findById(playlist_music_seq).orElse(null);
        if(music != null) {
        	playlistMusicRepository.deleteById(playlist_music_seq);
        } else {
        	log.info("곡을 찾을 수 없습니다.");
        	return "곡을 찾을 수 없습니다.";
        }
        
        return "SUCCESS";
    }

    /**
     * 플레이리스트 첫번째 곡 앨범아트 URL 가져오기
     */
    public String getCoverImage(int playlistSeq) {
        Playlist playlist = playlistRepository.findById(playlistSeq).orElse(null);
        if (playlist == null) {
            log.info("플레이리스트가 비어있습니다.");
            return null;
        }
        List<PlaylistMusic> playlistMusicList = playlistMusicRepository.findAll();
        for (int i = 0; i < playlistMusicList.size(); i++) {
            if (playlistMusicList.get(i).getPlaylistSeq() == playlistSeq) {
                Music music = musicRepository.findById(playlistMusicList.get(i).getMusicSeq()).orElse(null);
                return music.getCoverImage();
            }
        }
        return null;
    }
    
    public List<FindFavoriteDto> FindFavorite(int user_seq) {
//    	List<FindFavoriteDto> favorite_list = favoriteRepository.findAllByUser_UserSeq(user_seq);
//    	return favorite_list;
    	List<Favorite> favorite_list = favoriteRepository.findAllByUser_UserSeq(user_seq);
    	if(favorite_list != null) {
    		List<FindFavoriteDto> response = new ArrayList<>();
        	for(Favorite favo : favorite_list) {
        		FindFavoriteDto temp = new FindFavoriteDto(favo.getFavoriteSeq(), favo.getUser().getUserSeq(), favo.getPlaylist().getPlaylistSeq(), favo.getPlaylist().getPlaylistName(), favo.getPlaylist().getIsPrivate());
        		response.add(temp);
        	}
        	return response;
    	} else {
    		return null;
    	}
    }

    @Transactional
    public String insertFavorite(FavoriteRequestDto favoriteRequestDto) {
        Favorite favo = favoriteRepository.findByUser_UserSeqAndPlaylist_PlaylistSeq(favoriteRequestDto.getUserSeq(), favoriteRequestDto.getPlaylistSeq());
        if(favo == null) {
//    		Favorite favorite = new Favorite(favoriteRequestDto.getUser_seq(), favoriteRequestDto.getPlaylist_seq());
            Favorite favorite = new Favorite(new User(favoriteRequestDto.getUserSeq()), new Playlist(favoriteRequestDto.getPlaylistSeq()));
            favoriteRepository.save(favorite);
            return "SUCCESS";
        } else {
            return "EXIST";
        }
    }

    @Transactional
    public String deleteFavorite(int user_seq, int playlist_seq) {
        try {
            log.info("****** Favorite DB Delete Start ******");
            favoriteRepository.deleteByUser_UserSeqAndPlaylist_PlaylistSeq(user_seq, playlist_seq);
            log.info("****** Favorite DB Delete End ******");
        } catch(Exception e) {
            System.out.println(e);
            e.printStackTrace();
            return "FAIL";
        }
        log.info("****** Favorite DB Delete SUCCESS ******");
        return "SUCCESS";
    }


    /**
     * 플레이리스트 상세정보 (이름, 공개여부) 수정
     */
    public String updatePlaylistDetail(PlaylistNameAndPrivateSimpleDto requestDto, int playlistSeq) {
        Playlist playlist = playlistRepository.findById(playlistSeq).orElse(null);
        if (playlist == null) {
            log.info("해당 플레이리스트가 없습니다.");
            return "There is no playlist";
        }
        playlist.setPlaylistName(requestDto.getPlaylistName());
        playlist.setIsPrivate(requestDto.getIsPrivate());
        playlistRepository.save(playlist);
        return "successfully updated";
    }

    /**
     * 플레이리스트 정보 가져오기
     */
    public PlaylistWithFavoriteSimpleDto getPlaylistInfo(int playlistSeq, int userSeq) {
        PlaylistWithFavoriteSimpleDto playlistWithFavoriteSimpleDto = new PlaylistWithFavoriteSimpleDto();
        Playlist playlist = playlistRepository.findById(playlistSeq).orElse(null);
        if (playlist == null) {
            log.info("해당 플레이리스트가 존재하지 않습니다.");
            return null;
        }

        playlistWithFavoriteSimpleDto.setPlaylistSeq(playlist.getPlaylistSeq());
        playlistWithFavoriteSimpleDto.setPlaylistName(playlist.getPlaylistName());
        playlistWithFavoriteSimpleDto.setIsPrivate(playlist.getIsPrivate());
        playlistWithFavoriteSimpleDto.setUserSeq(playlist.getUserSeq());

        // set favorite status
        Favorite favorite = favoriteRepository.findByUser_UserSeqAndPlaylist_PlaylistSeq(userSeq, playlistSeq);
        if (favorite != null) {
            playlistWithFavoriteSimpleDto.setIsFavorite(true);
        } else {
            playlistWithFavoriteSimpleDto.setIsFavorite(false);
        }

        return playlistWithFavoriteSimpleDto;
    }
//    public PlaylistSimpleDto getPlaylistInfo(int playlistSeq) {
//        PlaylistSimpleDto playlistSimpleDto = new PlaylistSimpleDto();
//        Playlist playlist = playlistRepository.findById(playlistSeq).orElse(null);
//        if (playlist == null) {
//            log.info("해당 플레이리스트가 존재하지 않습니다.");
//            return null;
//        }
//        playlistSimpleDto.setPlaylistSeq(playlist.getPlaylistSeq());
//        playlistSimpleDto.setUserSeq(playlist.getUser().getUserSeq());
//        playlistSimpleDto.setPlaylistName(playlist.getPlaylistName());
//        playlistSimpleDto.setIsPrivate(playlist.getIsPrivate());
//
////        log.info("------playlist 정보------");
////        log.info("playlistSeq : " + playlist.getPlaylistSeq());
////        log.info("userSeq : " + playlist.getUser().getUserSeq());
////        log.info("playlistName : " + playlist.getPlaylistName());
////        log.info("isPrivate : " + playlist.getIsPrivate());
//
//        return playlistSimpleDto;
//    }

    


}
