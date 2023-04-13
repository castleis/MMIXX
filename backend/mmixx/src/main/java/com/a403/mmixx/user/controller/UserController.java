package com.a403.mmixx.user.controller;

import com.a403.mmixx.user.model.dto.UserDto;
import com.a403.mmixx.user.model.entity.User;
import com.a403.mmixx.user.model.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

//@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = "Authorization")
@Api(tags = {"회원", "api"})
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    
    @ApiOperation(value = "회원 로그인", notes = "Google 로그인")
    @GetMapping("/login")
    public void moveLoginUrl(HttpServletRequest request) throws Exception {
        // 구글로그인 창을 띄우고, 로그인 후 리다이렉션
        userService.request();
    }//getGoogleAuthUrl

    @ApiOperation(value = "회원 정보 조회", notes = "회원의 정보를 조회합니다.")
    @GetMapping("/{userSeq}")
    public ResponseEntity<?> getUser(@PathVariable Integer userSeq) {
        // name에 userSeq 저장되어 있음
//        Integer authUserSeq = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName().toString());
//
//        if(userSeq != authUserSeq){
//            log.error("본인 아님");
//            // 나중에 에러 처리 해야됨
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }

        return ResponseEntity.ok(userService.getUser(userSeq));
    }

    @ApiOperation(value = "회원 탈퇴", notes = "현재 로그인 한 회원 탈퇴")
    @DeleteMapping("/{userSeq}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer userSeq) {
        // name에 userSeq 저장되어 있음
        Integer authUserSeq = Integer.parseInt(
                SecurityContextHolder.getContext().getAuthentication().getName().toString());
        if(userSeq != authUserSeq){
            log.error("본인 아님");
            // 나중에 에러 처리 해야됨
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        User user = userService.deleteUser(authUserSeq);
        if(user != null){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }


}//UserController
