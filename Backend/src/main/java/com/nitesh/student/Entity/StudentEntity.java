package com.nitesh.student.Entity;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "student_entry")
@Data
public class StudentEntity {

    @Id
    private String id;
    private Long age;
    @NonNull
    private String name;
    private String grade;
    @NonNull
    private String Parents_name;
    @NonNull
    private Long contact_no;


}