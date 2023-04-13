package com.a403.mmixx.config;

import com.a403.mmixx.auth.filter.JwtFilter;
import com.a403.mmixx.auth.service.CustomDefOAuth2UserService;
import com.a403.mmixx.auth.token.TokenProvider;
import com.a403.mmixx.handler.JwtAccessDeniedHandler;
import com.a403.mmixx.handler.JwtAuthenticationEntryPoint;
import com.a403.mmixx.handler.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.endpoint.NimbusAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomDefOAuth2UserService customDefOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final TokenProvider tokenProvider;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;


    @Value("${google.login.url}")
    private String loginPath;

    private static final String[] PERMIT_URL_ARRAY = {
            "/",
            "/user/login",
            /* auth */
            "/auth/**",
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/*/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource())
                .and()
                .httpBasic().disable() // rest 방식이므로 http 기본 설정 disable
                .csrf().disable() // token 방식이기 때문에 csrf disable
                .formLogin().disable() // form 로그인 형식 disable
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 x


                .and()
                // URL 별 권한 접근 제어 관리 옵션 시작점
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/*/**").permitAll() // Preflight Request 허용해주기
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .antMatchers(HttpMethod.POST, "/user").permitAll()
                .anyRequest().authenticated()

//                .and()
//                .apply(new JwtSecurityConfig(tokenProvider))

                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("https://j8a403.p.ssafy.io") // 로그아웃 이후 연결 페이지
//                .logoutSuccessUrl("http://localhost:3000") // 로그아웃 이후 연결 페이지
                .invalidateHttpSession(true)

                .and()
                .oauth2Login() // OAuth2기반의 로그인
                .loginPage(loginPath)
                .userInfoEndpoint() // 로그인 성공 후 사용자정보를 가져온다
                .userService(customDefOAuth2UserService) // 사용자 정보를 처리

                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)

                .and()
                .addFilterBefore(new JwtFilter(tokenProvider), OAuth2AuthorizationRequestRedirectFilter.class)
                // exception handling 할 때 만든 handler 클래스 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
        ;

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

//        configuration.addAllowedOriginPattern("*");
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://j8a403.p.ssafy.io"));

        configuration.addAllowedHeader("Authorization");
        configuration.addAllowedHeader("Content-Type");
        configuration.addAllowedHeader("refresh-token");
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Content-Type");
        configuration.addExposedHeader("refresh-token");

        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest>
    accessTokenResponseClient() {
        return new NimbusAuthorizationCodeTokenResponseClient();
    }

}//SecurityConfig
