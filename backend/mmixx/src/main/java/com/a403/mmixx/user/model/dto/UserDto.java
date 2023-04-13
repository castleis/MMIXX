package com.a403.mmixx.user.model.dto;

import com.a403.mmixx.auth.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private Integer userSeq; // 회원 일련번호
    private String email; // 이메일
    private String profileImageUrl; // 프로필사진 경로
    private String userName; // 이름
    private Role role; // 권한

}//UserDto
