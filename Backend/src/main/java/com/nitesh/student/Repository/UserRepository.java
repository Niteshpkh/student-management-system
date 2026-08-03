package com.nitesh.student.Repository;

import com.nitesh.student.Entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    UserEntity findByUserName(String userName);

}
