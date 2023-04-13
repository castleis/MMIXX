package com.a403.mmixx.music.model.entity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;

public interface MusicRepositoryCustom {
	Page<MusicListResponseDto> getMusicListByCondition(Integer user_seq, MusicCondition condition, Pageable pageable);
}
