package com.nitesh.student.Entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public class UserEntity {
    @Id
    private String id;
    private String userName;
    private String password;
    private String role;

}
