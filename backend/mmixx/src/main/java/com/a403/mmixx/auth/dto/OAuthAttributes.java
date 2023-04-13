package com.a403.mmixx.auth.dto;

import com.a403.mmixx.auth.entity.Role;
import com.a403.mmixx.user.model.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

// 구글 로그인 이후 가져온 사용자의 이메일, 이름, 프로필 사진 주소를 저장하는 DTO
@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey,
                           String name,
                           String email,
                           String picture){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }//builder

    public static OAuthAttributes of(String registarationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes){
        return ofGoogle(userNameAttributeName, attributes);
    }//of

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }//ofGoogle

    public User toEntity() {
        return User.builder()
                .userName(name)
                .email(email)
                .profileImageUrl(picture)
                .role(Role.USER)
                .build();
    }//toEntity

}//OAuthAttributes
