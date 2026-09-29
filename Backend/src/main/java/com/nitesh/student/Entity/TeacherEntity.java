package com.nitesh.student.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "Teacher_entry")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherEntity {
    @Id
    private ObjectId id;
    private String teachers_name;
    private String email;
    private String qualification;
    private String teacher_phone_no;
    private String subject;
}
