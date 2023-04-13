package com.a403.mmixx.auth.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import com.a403.mmixx.auth.token.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private final TokenProvider tokenProvider;

    // Jwt 인증 정보를 SecurityContext에 저장
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // token 정보 가져오기
        String jwt = resolveToken(request);
        String requestURI = request.getRequestURI();

//        System.out.println("==============="+jwt);

        if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("security context에 '{}' 인증 정보 저장. uri : {}", authentication.getName(), requestURI);
        }else{
            log.error("유효한 jwt 없음, uri : {}", requestURI);
        }

        filterChain.doFilter(request, response);

    }//doFilterInternal

    // request header 에서 token 정보를 가져오는 메서드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
//        System.out.println("===========resolveToken"+bearerToken);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }//resolveToken

}//JwtFilter
