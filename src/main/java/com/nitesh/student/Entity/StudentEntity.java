package com.nitesh.student.Entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "student_entry")
public class StudentEntity {

    @Id
    private ObjectId id;
    private Long age;
    private String name;
    private String grade;
    private String Parents_name;
    private Long contact_no;

    public StudentEntity() {
    }

    public ObjectId getId() {
        return id;
    }

    public Long getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getGrade() {
        return grade;
    }

    public void setContact_no(Long contact_no) {
        this.contact_no = contact_no;
    }

    public Long getContact_no() {
        return contact_no;
    }

    public String getParents_name() {
        return Parents_name;
    }

    public void setParents_name(String parents_name) {
        Parents_name = parents_name;
    }
}