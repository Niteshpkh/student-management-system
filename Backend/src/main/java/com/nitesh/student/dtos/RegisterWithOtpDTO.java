package com.nitesh.student.dtos;

import com.nitesh.student.enums.Role;
import lombok.Data;

@Data
public class RegisterWithOtpDTO {
    private String userName;
    private String email;
    private String password;
    private Role role;
    private String otp;
}