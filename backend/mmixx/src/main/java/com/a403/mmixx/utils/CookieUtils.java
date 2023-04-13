package com.a403.mmixx.utils;

import org.springframework.util.SerializationUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

public class CookieUtils {

    public static Cookie getCookie(HttpServletRequest request, String cookieName) {
        try{
            return Arrays.stream(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(cookieName)).findFirst().orElse(null);
        }catch (NullPointerException e){
            return null;
        }
    }//getCookie

    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);

        response.addCookie(cookie);
    }//addCookie

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Optional<Cookie> cookie =  Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(name)).findFirst();
        cookie.ifPresent(c -> {
            c.setPath("/");
            c.setMaxAge(0);
            c.setValue("");
            response.addCookie(c);
        });
    }//deleteCookie

    public static String serialize(Object obj) {
        return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(obj));
    }//serialize

    public static <T> T deserialize(Cookie cookie, Class<T> cls){
        return cls.cast(
                SerializationUtils.deserialize(
                        Base64.getUrlDecoder().decode(cookie.getValue())
                )
        );
    }//deserialize

}//CookieUtils
