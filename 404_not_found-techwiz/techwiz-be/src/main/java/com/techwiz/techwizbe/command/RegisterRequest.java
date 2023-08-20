package com.techwiz.techwizbe.command;

import com.techwiz.techwizbe.entities.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String phoneNumber;
    private String role;
    private String fullName;
    private Date dateOfBirth;
    private Gender gender;
}
