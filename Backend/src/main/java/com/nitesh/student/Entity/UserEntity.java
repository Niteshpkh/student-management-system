package com.nitesh.student.Entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
public class UserEntity {
    @Id
    private String id;
    private String userName;
    private String password;
    private String role;
     private  List<StudentEntity> studentEntities = new ArrayList<>();

}
