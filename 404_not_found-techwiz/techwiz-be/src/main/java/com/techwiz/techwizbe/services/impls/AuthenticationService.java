package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.AuthenticationRequest;
import com.techwiz.techwizbe.command.RegisterRequest;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.AuthenticationResponse;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.enums.Gender;
import com.techwiz.techwizbe.entities.enums.Role;
import com.techwiz.techwizbe.entities.modals.UserEntity;
import com.techwiz.techwizbe.repositories.UserRepository;
import com.techwiz.techwizbe.services.interfaces.IAuthenticationService;
import com.techwiz.techwizbe.services.interfaces.IEmailService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public ResponseDto<?> register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseConfig.conflict("An account already exists with this email. Please choose another email.");
        }
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            return ResponseConfig.conflict("An account with this phone number already exists. Please choose another phone number.");
        }

        var user = UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber() != null ? request.getPhoneNumber() : "")
                .role(request.getRole() != null ? Role.valueOf(request.getRole()) : Role.USER)
                .createdAt(new Date())
                .fullName(request.getFullName() != null ? request.getFullName() : "")
                .dateOfBirth(request.getDateOfBirth() != null ? request.getDateOfBirth() : null)
                .gender(request.getGender() != null ? request.getGender() : Gender.Other)
                .build();
        var savedUser = userRepository.save(user);
        var data = AuthenticationResponse.builder()
                .user(savedUser)
                .build();
        return ResponseConfig.created(data, "New account created successfully.");
    }

    @Override
    public ResponseDto<?> authenticate(AuthenticationRequest request) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return ResponseConfig.notFound("Account does not exist.");
        }
        var userByPhoneNumber = userRepository.findByPhoneNumber(request.getPhoneNumber());
        if (userByPhoneNumber.isEmpty()) {
            return ResponseConfig.notFound("Account does not exist.");
        }

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, refreshToken);
        var data = AuthenticationResponse.builder()
                .user(user)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseConfig.ok(data, "Logged in successfully.");
    }

    private void saveUserToken(UserEntity user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        user.setTokenRevoked(false);
        user.setTokenExpired(false);
        userRepository.save(user);
    }

    private void revokeAllUserTokens(UserEntity user) {
        user.setTokenRevoked(true);
        user.setTokenExpired(true);
        userRepository.save(user);
    }

    @Override
    public ResponseDto<?> refreshToken(
            HttpServletRequest request
    ) throws IOException {
        final String refreshTokenHeader = request.getHeader("REFRESH-TOKEN");
        final String refreshToken;
        final String userEmail;
        if (refreshTokenHeader == null) {
            return ResponseConfig.unAuthorized("No Refresh Token.");
        }
        refreshToken = refreshTokenHeader;
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail).orElseThrow();
            if (user.getRefreshToken().equals(refreshToken)) {
                var accessToken = jwtService.generateToken(user);
                var newRefreshToken = jwtService.generateRefreshToken(user);
                saveUserToken(user, newRefreshToken);
                var data = AuthenticationResponse.builder()
                        .user(user)
                        .accessToken(accessToken)
                        .refreshToken(newRefreshToken)
                        .build();
                return ResponseConfig.ok(data, "New JWT created successfully.");
            } else {
                ResponseConfig.unAuthorized("Token Expired.");
            }
        }
        return ResponseConfig.notFound("Account does not exist.");
    }

    public ResponseDto<?> logout(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return ResponseConfig.unAuthorized("There are no tokens or tokens that do not start with Bearer.");
        }
        var authToken = authHeader.substring(7);
        var userEmail = jwtService.extractUsername(authToken);
        if (userEmail == null) {
            return ResponseConfig.conflict("Wrong Token.");
        }
        var optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isEmpty()) {
            return ResponseConfig.notFound("Account does not exist.");
        }
        var user = optionalUser.get();
        user.setRefreshToken(null);
        user.setTokenExpired(true);
        user.setTokenRevoked(true);
        userRepository.save(user);

        SecurityContextHolder.clearContext();
        return ResponseConfig.ok(null,"Sign out successful.");
    }

    private String createRandomToken() {
        byte[] randomBytes = new byte[32];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        if (userRepository.existsByPasswordResetToken(token)) {
            return createRandomToken();
        }
        return token;
    }
}
