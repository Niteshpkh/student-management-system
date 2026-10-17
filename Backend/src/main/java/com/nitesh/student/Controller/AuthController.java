package com.nitesh.student.Controller;

import com.nitesh.student.Entity.OtpEntity;
import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Repository.OtpRepository;
import com.nitesh.student.Repository.UserRepository;
import com.nitesh.student.Services.EmailService;
import com.nitesh.student.dto.OtpRequestDTO;
import com.nitesh.student.dto.RegisterWithOtpDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpRepository otpRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequestDTO request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required."));
        }

        String email = request.getEmail().trim().toLowerCase();

        // Check format
        if (!email.endsWith("@gmail.com")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Please enter a valid @gmail.com address."));
        }

        // Check if email already registered
        if (userRepo.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "An account with this email already exists."));
        }

        // Clear older OTPs for this email and save new one
        otpRepo.deleteByEmail(email);
        String otp = emailService.generateOtp(6);

        OtpEntity otpRecord = OtpEntity.builder()
                .email(email)
                .otp(otp)
                .createdAt(LocalDateTime.now())
                .build();
        otpRepo.save(otpRecord);

        // Output to terminal
        emailService.sendOtpEmail(email, otp);

        return ResponseEntity.ok(Map.of("message", "Verification code sent to " + email));
    }

    @PostMapping("/verify-and-register")
    public ResponseEntity<?> verifyAndRegister(@RequestBody RegisterWithOtpDTO dto) {
        String email = dto.getEmail() != null ? dto.getEmail().trim().toLowerCase() : "";

        // Verify OTP from database
        Optional<OtpEntity> record = otpRepo.findTopByEmailOrderByCreatedAtDesc(email);
        if (record.isEmpty() || !record.get().getOtp().equals(dto.getOtp() != null ? dto.getOtp().trim() : "")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired verification code."));
        }

        // Verify username uniqueness
        if (userRepo.findByUserName(dto.getUserName().trim()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Username is already taken."));
        }

        // Create and persist the user
        UserEntity newUser = UserEntity.builder()
                .userName(dto.getUserName().trim())
                .email(email)
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .build();
        userRepo.save(newUser);

        // Invalidate OTP after successful consumption
        otpRepo.deleteByEmail(email);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Registration successful. You can now log in."));
    }
}