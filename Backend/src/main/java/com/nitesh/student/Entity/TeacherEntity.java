package com.nitesh.student.Entity;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "Teacher_entry")
@Data
public class TeacherEntity {
    @Id
    private ObjectId id;
    private String teachers_name;
    private String email;
    private String qualification;
    private Long teacher_phone_no;
    private String Subject;
}
