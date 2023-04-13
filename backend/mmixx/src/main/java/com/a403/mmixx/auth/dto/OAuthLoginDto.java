package com.a403.mmixx.auth.dto;

import com.a403.mmixx.user.model.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OAuthLoginDto {
    private boolean isSigned;
    private UserDto user;
    private int playListCnt;
    private int uploadCnt;
    private int mixCnt;
}//OAuthLoginDto
