package com.a403.mmixx.auth.token;

import com.a403.mmixx.auth.entity.PrincipalDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

// token 생성, 유효성 검증 등을 위한 클래스
@Component
@Slf4j
public class TokenProvider implements InitializingBean {

    private static final String AUTHORITIES_KEY = "auth";

    private final String tokenKey;

    private final long tokenValidityInMilliseconds;
    // access token 한시간
    private final long ACCESS_TIME;
    // refresh token 하루
    private long REFRESH_TIME;
    private Key key;

    public TokenProvider(
            @Value("${jwt.token.key}") String tokenKey,
            @Value("${jwt.token.time}") long tokenValidityInSeconds) {
        this.tokenKey = tokenKey;
        this.tokenValidityInMilliseconds = tokenValidityInSeconds;
        this.ACCESS_TIME = tokenValidityInMilliseconds;
        this.REFRESH_TIME = tokenValidityInMilliseconds * 24L;
    }

    // 빈 생성 후 주입을 받은 후 tokenKey값을 Base64 Decode해서 key에 할당
    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(tokenKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(Authentication authentication){
        return createToken(authentication, "access-token", ACCESS_TIME);
    }

    public String createRefreshToken(Authentication authentication){
        return createToken(authentication, "refresh-token", REFRESH_TIME);
    }

    // token 생성
    public String createToken(Authentication authentication, String subject, long expire) {
        Date now = new Date();

        // 권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Integer userSeq = principalDetails.getUser().getUserSeq();
//        System.out.println("#################createToken :" + userSeq);
        String role = principalDetails.getUser().getRoleKey();

        String jwt = Jwts.builder()
                .setId(userSeq.toString()) // id : userSeq
                // Header 설정 : 토큰의 타입, 해쉬 알고리즘 정보 세팅
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                // payload 설정 : 유효기간(Expriration), 토큰 제목(Subject), 데이터(Claim) 등 정보 셋팅)
                .claim("id", userSeq)
                .claim("name", principalDetails.getUser().getUserName())
                .claim("img", principalDetails.getUser().getProfileImageUrl())
                .claim(AUTHORITIES_KEY, role)
                .claim("plyCnt", 0) // 플레이리스트 수
                .claim("upCnt", 0) // 업로드 수
                .claim("mixCnt",0) // 믹스 수
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expire)) // 토큰 유효기간
                .setSubject(subject) // 토큰 제목 설정 ex) access-token, refresh-token
                .signWith(SignatureAlgorithm.HS256, key) // Signature 설정 : secret key를 활용한 암호화
                .compact(); // 직렬화 처리

        return jwt;
    }//createToken

    // token 유효성 검증 메서드
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        }catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e){
            log.error("잘못된 JWT 서명");
        }catch (ExpiredJwtException e){
            log.error("만료된 JWT");
        }catch (UnsupportedJwtException e){
            log.error("지원되지 않는 JWT");
        }catch (IllegalArgumentException e) {
            log.error("잘못된 JWT");
        }
        return false;
    }//validateToken

    // Token에 담겨 있는 정보를 이용해서 Authentication 객체를 리턴하는 메소드
    public Authentication getAuthentication(String token) {
        // Token으로 클레임 생성
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // User 객체를 만들어서 Authentication 리턴
        System.out.println("----TokenProvider.java:128---ididididiidididi"+claims.getId());
        User principal = new User(claims.getId(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

}//TokenProvider
