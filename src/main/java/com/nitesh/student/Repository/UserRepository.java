package com.nitesh.student.Repository;

import com.nitesh.student.Entity.UserEntity;
import org.apache.catalina.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, ObjectId> {
    UserEntity findByUserName (String username);
}
