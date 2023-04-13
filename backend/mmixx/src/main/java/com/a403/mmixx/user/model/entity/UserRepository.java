package com.a403.mmixx.user.model.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    /* email을 통해 이미 가입된 회원인지 확인 */
    Optional<User> findByEmail(String email);

    /* token 있는지 확인 */
    Optional<String> findByToken(Integer userSeq);


}//UserRepository
