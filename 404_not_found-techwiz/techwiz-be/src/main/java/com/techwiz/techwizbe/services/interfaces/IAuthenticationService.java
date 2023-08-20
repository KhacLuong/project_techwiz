package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.AuthenticationRequest;
import com.techwiz.techwizbe.command.RegisterRequest;
import com.techwiz.techwizbe.dto.ResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public interface IAuthenticationService {
    ResponseDto<?> register(RegisterRequest request);
    ResponseDto<?> authenticate(AuthenticationRequest request);
    ResponseDto<?> refreshToken(HttpServletRequest request) throws IOException;
    ResponseDto<?> logout(HttpServletRequest request);
}
