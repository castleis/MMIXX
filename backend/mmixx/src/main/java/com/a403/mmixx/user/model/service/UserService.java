package com.a403.mmixx.user.model.service;

import com.a403.mmixx.user.model.dto.UserDto;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final HttpServletResponse response;
    @Value("${google.login.url}")
    private String loginUrl;

    public void request() {

        try {
            response.sendRedirect(loginUrl);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }//request

    // 로그인 한 사용자 정보 가져오기
    public UserDto getUser(Integer userSeq) {
        User user = userRepository.findById(userSeq)
                .orElse(null);

        return UserDto.builder()
                .userSeq(user.getUserSeq())
                .userName(user.getUserName())
                .email(user.getEmail())
                .profileImageUrl(user.getProfileImageUrl())
                .role(user.getRole())
                .build();
    }//getUser

    @Transactional
    public User deleteUser(Integer userSeq){
        User user = userRepository.findById(userSeq).orElse(null);
        if(user != null){
            userRepository.deleteById(userSeq);
        }
        return user;
    }//deleteUser

}//UserService
