package com.a403.mmixx.handler;

import com.a403.mmixx.auth.dto.OAuthLoginDto;
import com.a403.mmixx.auth.entity.PrincipalDetails;
import com.a403.mmixx.auth.token.TokenProvider;
import com.a403.mmixx.user.model.dto.UserDto;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.entity.UserRepository;
import com.a403.mmixx.utils.CookieUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String REFRESH_TOKEN = "refresh-token";
    private static final String AUTH = "Authorization";
    private static final int REFRESH_PERIOD = 60 * 60 * 24 * 14;
    @Value("${mmixx.server}")
    private String SERVER_URL;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
            , Authentication authentication) throws IOException {
//        // 기존에 쿠키에 저장된 토근이 있을 경우 삭제
//        if(CookieUtils.getCookie(request, REFRESH_TOKEN) != null) {
//            CookieUtils.deleteCookie(request, response, REFRESH_TOKEN);
//        }


        // redirect 할 url을 지정해준다
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        response.sendRedirect(targetUrl);
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response
            , Authentication authentication) {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
//        log.info("**** path : {}", request.getScheme() + "://" + request.getServerName());
//        String targetUrl = request.getScheme() + "://" + request.getServerName() +":3000/login/success";
//        String targetUrl = request.getRequestURL().toString()
//                .replace(request.getRequestURI(),"");

        String targetUrl = "http://" + request.getServerName();
        if(request.getServerName().toString().indexOf(SERVER_URL) > -1) targetUrl += "/login/success";
        else targetUrl += ":3000/login/success";

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();

        // 인증 정보를 기반으로 JWT 토큰 생성
        String accessJwt = tokenProvider.createAccessToken(authentication);
        String refreshJwt = tokenProvider.createRefreshToken(authentication);

        response.setHeader(AUTH, accessJwt);
        response.setHeader(REFRESH_TOKEN, refreshJwt);
//        CookieUtils.addCookie(response,REFRESH_TOKEN, refreshJwt, REFRESH_PERIOD);

        user.tokenUpdate(refreshJwt);
        userRepository.save(user);

        OAuthLoginDto loginDto = OAuthLoginDto.builder()
                .isSigned(true)
                .user(UserDto.builder()
                        .userSeq(user.getUserSeq())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .profileImageUrl(user.getProfileImageUrl())
                        .userName(user.getUserName())
                        .build())
                .playListCnt(0)
                .uploadCnt(0)
                .mixCnt(0)
                .build();

        try{
            String jsonResponseData = objectMapper.writeValueAsString(loginDto);
            response.getWriter().write(jsonResponseData);
        }catch (IOException e){
            log.error("json error");
        }


        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", accessJwt)
                .queryParam("no", user.getUserSeq())
                .build().toUriString();
    }

}//OAuth2AuthenticationSuccessHandler
