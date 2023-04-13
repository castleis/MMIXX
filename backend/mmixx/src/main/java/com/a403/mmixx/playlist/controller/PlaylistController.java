

package com.a403.mmixx.playlist.controller;

import com.a403.mmixx.playlist.model.dto.*;
import com.a403.mmixx.playlist.model.entity.Playlist;
import com.a403.mmixx.playlist.model.service.PlaylistService;
import com.amazonaws.Response;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Api(tags = {"플레이리스트", "api", "Playlist"})

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    // 빈 플레이리스트 생성 + 생성된 플레이리스트에 곡 리스트 추가한 후 DB 저장까지
    @PostMapping("/{userSeq}")
    public ResponseEntity<?> createPlaylist(@RequestBody PlaylistDto requestDto, @PathVariable int userSeq) {
        Integer playlistSeq = playlistService.createPlaylist(requestDto, userSeq);
        return ResponseEntity.ok().body(playlistSeq);
    }

    // 플레이리스트에 곡 추가
    @PostMapping("/{userSeq}/{playlistSeq}")
    public ResponseEntity addMusicToPlaylist(@RequestBody PlaylistMusicRequestDtoForAddMusic requestDto, @PathVariable String playlistSeq, @PathVariable String userSeq) {
        return ResponseEntity.ok(playlistService.addMusicToPlaylist(requestDto, playlistSeq, userSeq));
    }

    //  (관리자용) private 여부 상관없이 모든 유저의 모든 플레이리스트를 조회
    @GetMapping("/all/{userSeq}")
    public List<PlaylistSimpleDto> getAllPlaylist(@PathVariable int userSeq) {
        return playlistService.getAllPlaylist(userSeq);
    }

    //  전체 플레이리스트 목록을 조회 - public playlist
    @GetMapping("/global/{userSeq}")
    public List<PlaylistWithFavoriteSimpleDto> getGlobalPlaylist(@PathVariable int userSeq) {
        return playlistService.getGlobalPlaylist(userSeq);
    }

    //  개인 플레이리스트 목록을 조회 - private playlist
    @GetMapping("/user/{userSeq}")
    public List<PlaylistWithFavoriteSimpleDto> getPrivatePlaylist(@PathVariable int userSeq) {
        return playlistService.getPrivatePlaylist(userSeq);
    }


    // 해당(playlistSeq) 플레이리스트에 속한 노래 목록 조회
    @GetMapping("/{playlistSeq}")
    public List<PlaylistMusicDetailResponseDtoForRetrieve> getMusicListInPlaylist(@PathVariable("playlistSeq") int playlistSeq) {
        return playlistService.getMusicListInPlaylist(playlistSeq);
    }

    // 해당(playlistSeq) 플레이리스트 삭제
    @ApiOperation(value = "플레이리스트 삭제")
    @DeleteMapping("/{playlistSeq}")
    public ResponseEntity<?> deletePlaylist(@PathVariable int playlistSeq) {
        return ResponseEntity.ok(playlistService.deletePlaylist(playlistSeq));
    }
    
    @ApiOperation(value = "플레이리스트 내의 개별 음악 삭제")
    @DeleteMapping("/detail/{playlist_music_seq}")
    public ResponseEntity<?> deletePlaylistMusic(@PathVariable int playlist_music_seq) {
        return ResponseEntity.ok(playlistService.deleteDetailMusicPlaylist(playlist_music_seq));
    }

    //  해당(playlistSeq) 플레이리스트의 첫번째 곡 앨범커버아트 URL 가져오기
    @ApiOperation(value = "플레이리스트 첫번째 곡의 커버 이미지 URL 가져오기")
    @GetMapping("/{playlistSeq}/1")
    public String getCoverImage(@PathVariable("playlistSeq") int playlistSeq){
        return playlistService.getCoverImage(playlistSeq);
    }


    @ApiOperation(value = "플레이리스트 상세정보 수정 (이름 변경, 공개/비공개 변경)")
    @PutMapping("/detail/{playlistSeq}")
    public ResponseEntity<?> updatePlaylistDetail(@RequestBody PlaylistNameAndPrivateSimpleDto requestDto, @PathVariable int playlistSeq) {
        return ResponseEntity.ok(playlistService.updatePlaylistDetail(requestDto, playlistSeq));
    }


//    @ApiOperation(value = "플레이리스트 정보 조회")
//    @GetMapping("/info/{playlistSeq}")
//    public PlaylistSimpleDto getPlaylistInfo(@PathVariable int playlistSeq) {
//        return playlistService.getPlaylistInfo(playlistSeq);
//    }

    @ApiOperation(value = "플레이리스트 정보 조회")
    @GetMapping("/info/{playlistSeq}/{userSeq}")
    public PlaylistWithFavoriteSimpleDto getPlaylistInfo(@PathVariable int playlistSeq, @PathVariable int userSeq) {
        return playlistService.getPlaylistInfo(playlistSeq, userSeq);
    }

    @ApiOperation(value = "즐겨찾기한 플레이리스트 목록 조회")
    @GetMapping("/favorite/{user_seq}")
    public ResponseEntity<?> findFavorite(@PathVariable int user_seq) {
    	return ResponseEntity.ok(playlistService.FindFavorite(user_seq));
    }


    @ApiOperation(value = "즐겨찾기 등록")
    @PostMapping("/favorite")
    public ResponseEntity<?> insertFavorite(@RequestBody FavoriteRequestDto favoriteRequestDto) {
    	return ResponseEntity.ok(playlistService.insertFavorite(favoriteRequestDto));
    }

    @ApiOperation(value = "즐겨찾기 삭제")
    @DeleteMapping("/favorite/{user_seq}/{playlist_seq}")
    public ResponseEntity<?> deleteFavorite(@PathVariable int user_seq, @PathVariable int playlist_seq) {
    	System.out.println("user_seq : " + user_seq + " playlist_seq : " + playlist_seq);
    	String response = playlistService.deleteFavorite(user_seq, playlist_seq);
    	return ResponseEntity.ok(response);
    }

}