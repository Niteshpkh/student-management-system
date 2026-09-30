package com.nitesh.student.Entity;

import com.nitesh.student.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserEntity {
    @Id
    private String id;
    private String userName;
    private String password;
    private Role role;
     private  String studentId;
     private String teacherId;

}
