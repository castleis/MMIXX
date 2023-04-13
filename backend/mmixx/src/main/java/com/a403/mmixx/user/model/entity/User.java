package com.a403.mmixx.user.model.entity;

import com.a403.mmixx.auth.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@DynamicInsert
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    @JsonIgnore
    private Integer userSeq; // 회원 일련번호

    @Column(length = 100, nullable = false)
    @JsonIgnore
    private String email; // 이메일

    @Column(name = "profile_image_url", length = 500, nullable = false)
    @JsonIgnore
    private String profileImageUrl; // 프로필사진 경로

    @Column(name = "user_name", length = 100, nullable = false)
    @JsonIgnore
    private String userName; // 이름

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    @JsonIgnore
    private Role role; // 권한

    @Column(length = 1000)
    @JsonIgnore
    private String token; // 토큰

    @Builder
    public User(String userName, String email, String profileImageUrl, Role role){
        this.userName = userName;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.role = role;
    }
    
    public User(Integer user_seq) {
    	this.userSeq = user_seq;
    }
    
    public User(Integer user_seq, Role role) {
    	this.userSeq = user_seq;
    	this.role = role;
    }

    public User update(String userName, String profileImageUrl){
        this.userName = userName;
        this.profileImageUrl = profileImageUrl;

        return this;
    }

    public User tokenUpdate(String token) {
        this.token = token;
        return this;
    }

    public User seqUpdate(Integer userSeq) {
        this.userSeq = userSeq;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

}//User
