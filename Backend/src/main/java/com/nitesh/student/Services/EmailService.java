package com.nitesh.student.Services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final SecureRandom random = new SecureRandom();

    public String generateOtp(int length) {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    public void sendOtpEmail(String recipientEmail, String otp) {
        log.info("==========================================================");
        log.info("📩 [MOCK EMAIL DISPATCHED]");
        log.info("👤 To: {}", recipientEmail);
        log.info("🔑 Verification OTP: >>> {} <<<", otp);
        log.info("⏱  Validity: 5 Minutes");
        log.info("==========================================================");
    }
}