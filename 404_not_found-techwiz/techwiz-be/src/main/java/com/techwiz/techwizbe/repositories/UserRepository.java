package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    @Query("SELECT u from users u where concat(u.email, u.phoneNumber) like %?1%")
    Page<UserEntity> findByKeyword(String Keyword, Pageable pageable);
    Optional<UserEntity> findByPhoneNumber(String phoneNumber);
    boolean existsByPasswordResetToken(String token);
    Optional<UserEntity> findByPasswordResetToken(String token);
}
