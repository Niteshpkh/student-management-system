package com.nitesh.student.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "otp_verifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OtpEntity {

    @Id
    private String id;

    @Indexed
    private String email;

    private String otp;

    // Automatically purged by MongoDB after 300 seconds (5 minutes)
    @Indexed(expireAfter = "300s")
    private LocalDateTime createdAt;
}