package com.nitesh.student.Entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "Teacher_entry")
public class TeacherEntity {
    @Id
    private ObjectId id;
    private String teachers_name;
    private String email;
    private String qualification;
    private Long teacher_phone_no;
    private String Subject;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getTeachers_name() {
        return teachers_name;
    }

    public void setTeachers_name(String teachers_name) {
        this.teachers_name = teachers_name;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTeacher_phone_no() {
        return teacher_phone_no;
    }

    public void setTeacher_phone_no(Long teacher_phone_no) {
        this.teacher_phone_no = teacher_phone_no;
    }

    public String getSubject() {
        return Subject;
    }

    public void setSubject(String subject) {
        Subject = subject;
    }

    public String getEmail() {
        return email;
    }
}

