package com.nitesh.student.Repository;

import com.nitesh.student.Entity.OtpEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends MongoRepository<OtpEntity, String> {
    Optional<OtpEntity> findTopByEmailOrderByCreatedAtDesc(String email);
    void deleteByEmail(String email);
}