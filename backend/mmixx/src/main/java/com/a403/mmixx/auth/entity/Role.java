package com.a403.mmixx.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum Role {

    USER("ROLE_USER", "일반 사용자 권한"),
    GUEST("GUEST", "게스트 권한");

    private final String Key;
    private final String displayName;

    public static Role of(String key) {
        return Arrays.stream(Role.values())
                .filter(r -> r.getKey().equals(key))
                .findAny()
                .orElse(GUEST);
    }

}//RoleType
