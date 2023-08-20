package com.techwiz.techwizbe.controllers;

import com.techwiz.techwizbe.command.ResetPasswordRequest;
import com.techwiz.techwizbe.command.ChangePasswordRequest;
import com.techwiz.techwizbe.command.UpdateUserInfoRequest;
import com.techwiz.techwizbe.services.interfaces.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService iuserService;

    @GetMapping("")
    public ResponseEntity<?> index(
            @RequestParam(value = "pageNumber") int pageNumber,
            @RequestParam(value = "perPage") int perPage,
            @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "keyword", required = false) String keyword
    ) {
        if (keyword != null && !keyword.isEmpty())
        {
            var data = iuserService.getListUsersByKeyword(pageNumber, perPage, sortField, sortDir, keyword);
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        }
        var data = iuserService.getListUsers(pageNumber, perPage, sortField, sortDir);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@RequestParam(value = "id") long id) {
        var data = iuserService.getUsersById(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping(value = "/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestParam(value = "email") String email){
        var data = iuserService.forgetPassword(email);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping(value = "/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request){
        var data = iuserService.resetPassword(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping(value = "/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
        var data = iuserService.changePassword(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping(value = "/update-info")
    public ResponseEntity<?> updateInfo(@RequestBody UpdateUserInfoRequest request){
        var data = iuserService.updateUserInfo(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
