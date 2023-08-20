package com.techwiz.techwizbe.command;

import com.techwiz.techwizbe.entities.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserInfoRequest {
    private long id;
    private String fullName;
    private Date dateOfBirth;
    private String phoneNumber;
    private Gender gender;
    private String email;
}
