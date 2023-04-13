package com.a403.mmixx.auth.service;

import com.a403.mmixx.auth.dto.OAuthAttributes;
import com.a403.mmixx.auth.entity.PrincipalDetails;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomDefOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        log.info("로그인시도");
        // 현재 로그인 진행 중인 서비스를 구분. (OAuth2 서비스 id (구글 등))
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        // OAuth2 로그인 진행 시 키가 되는 필드 값 (pk)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                                        .getUserInfoEndpoint().getUserNameAttributeName();


        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        User user = saveOrUpdate(attributes);

        return processOAuth2User(userRequest, oAuth2User, user);

    }//loadUser

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User, User user) {

        log.info("processOAuth2User 성공");
        log.info("user , {}", user);
        log.info("oAuth2User , {}", oAuth2User.getAttributes());

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }

    private User saveOrUpdate(OAuthAttributes attributes) {

        boolean isJoin = false;
        // 이미 가입된 사용자라면 정보(이름, 프로필 이미지) 업데이트
        if(userRepository.findByEmail(attributes.getEmail()) == null){
            isJoin = true;
        }
        User user = userRepository.findByEmail(attributes.getEmail())
                // 이미 가입된 사용자라면 정보(이름, 프로필 이미지) 업데이트
                .map(entity -> entity.update(attributes.getName(), attributes.getPicture()))
                // 가입되지 않은 사용자라면 회원가입
                .orElse(attributes.toEntity());

        Integer seq = userRepository.save(user).getUserSeq();
        user.seqUpdate(seq);


        return user;
    }//saveOrUpdate

}//CustomOAuth2UserService
