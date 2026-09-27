package com.nitesh.student.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "Teacher_entry")
@Data
public class TeacherEntity {
    @Id
    private ObjectId id;
    @NotNull(message = "Please insert the teacher's name")
    private String teachers_name;
    @NotNull (message = "email must be written")
    private String email;
    private String qualification;
    private Long teacher_phone_no;
    private String subject;
}
