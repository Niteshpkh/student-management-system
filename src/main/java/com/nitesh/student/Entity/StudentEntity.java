package com.nitesh.student.Entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "student_entry")
@Data
public class StudentEntity {

    @Id
    private ObjectId id;
    private Long age;
    private String name;
    private String grade;
    private String Parents_name;
    private Long contact_no;
}