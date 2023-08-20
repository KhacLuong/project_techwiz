package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.ChangePasswordRequest;
import com.techwiz.techwizbe.command.ResetPasswordRequest;
import com.techwiz.techwizbe.command.UpdateUserInfoRequest;
import com.techwiz.techwizbe.dto.ResponseDto;

public interface IUserService {
    ResponseDto<?> getListUsers(int pageNumber, int perPage, String sortField, String sortDir);
    ResponseDto<?> getListUsersByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    ResponseDto<?> getUsersById(long id);
    ResponseDto<?> forgetPassword(String token);
    ResponseDto<?> resetPassword(ResetPasswordRequest request);
    ResponseDto<?> changePassword(ChangePasswordRequest request);
    ResponseDto<?> updateUserInfo(UpdateUserInfoRequest request);
}
