package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.ChangePasswordRequest;
import com.techwiz.techwizbe.command.ResetPasswordRequest;
import com.techwiz.techwizbe.command.UpdateUserInfoRequest;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.repositories.UserRepository;
import com.techwiz.techwizbe.services.interfaces.IUserService;
import com.techwiz.techwizbe.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserImplService implements IUserService {
    private final UserRepository userRepository;
    private final EmailImplService eMailImplService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseDto<?> getListUsers(int pageNumber, int perPage, String sortField, String sortDir) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = userRepository.findAll(pageable);
        if (data.isEmpty()){
            return ResponseConfig.noContent("No user has been found.");
        }
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Get list of users successfully.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getListUsersByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = userRepository.findByKeyword(keyword, pageable);
        if (data.isEmpty()){
            return ResponseConfig.noContent("No account found with keyword " + keyword);
        }
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseConfig.ok(data.getContent(), "Get a list of accounts with keywords " + keyword + " successfully.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getUsersById(long id) {
        var data = userRepository.findById(id);
        if (data.isEmpty()){
            return ResponseConfig.noContent("No account found.");
        }
        var user = data.get();
        return ResponseConfig.ok(data, "Get user successfully.");
    }

    @Override
    public ResponseDto<?> forgetPassword(String email){
        if (email.isEmpty()){
            return ResponseConfig.badRequest("Please enter email.");
        }
        var data = userRepository.findByEmail(email);
        if (data.isEmpty()){
            return ResponseConfig.notFound("There are no accounts that match the email provided.");
        }
        var user = data.get();
        user.setPasswordResetToken(createRandomToken());
        user.setPasswordResetExpired(Date.from(new Date().toInstant().plus(Duration.ofDays(1))));
        userRepository.save(user);
        eMailImplService.sendSimpleMessage(
                email,
                "Reset password",
                "Click on this link:\n" +
                        "https://plantnest-404notfound.azurewebsites.net/api/v1/users/reset-password?token=" + user.getPasswordResetToken()
        );
        return ResponseConfig.ok(null, "Check your email to reset your password.");
    }

    @Override
    public ResponseDto<?> resetPassword(ResetPasswordRequest request){
        var data = userRepository.findByPasswordResetToken(request.getToken());
        if (data.isEmpty()){
            return ResponseConfig.notFound("Invalid token.");
        }
        var user = data.get();
        if (user.getPasswordResetExpired().toInstant().isBefore(new Date().toInstant())){
            return ResponseConfig.conflict("Token for creating new password has expired");
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetExpired(null);
        userRepository.save(user);
        return ResponseConfig.ok(null, "New password successfully created.");
    }

    @Override
    public ResponseDto<?> changePassword(ChangePasswordRequest request){
        var data = userRepository.findById(request.getId());
        if (data.isEmpty()) {
            return ResponseConfig.notFound("Account not found.");
        }
        var user = data.get();
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            return ResponseConfig.conflict("Old password is incorrect.");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return ResponseConfig.ok(null, "Change password successfully.");
    }

    @Override
    public ResponseDto<?> updateUserInfo(UpdateUserInfoRequest request) {
        var data = userRepository.findById(request.getId());
        if (data.isEmpty()) {
            return ResponseConfig.notFound("Account not found.");
        }
        var user = data.get();
        user.setFullName(request.getFullName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        return ResponseConfig.ok(user, "Change account information successfully.");
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
