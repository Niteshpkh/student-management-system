package com.nitesh.student.dtos;


import com.nitesh.student.Entity.TeacherEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherResponseDTO {

    private String id;
    private String teachers_name;
    private String email;
    private String qualification;
    private String teacher_phone_no;
    private String subject;

    public static TeacherResponseDTO fromEntity(TeacherEntity entity) {
        if (entity == null) return null;
        return TeacherResponseDTO.builder()
                .id(String.valueOf(entity.getId()))
                .teachers_name(entity.getTeachers_name())
                .email(entity.getEmail())
                .qualification(entity.getQualification())
                .teacher_phone_no(String.valueOf(entity.getTeacher_phone_no()))
                .subject(entity.getSubject())
                .build();
    }
}