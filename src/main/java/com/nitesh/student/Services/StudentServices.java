package com.nitesh.student.Services;

import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Repository.StudentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class StudentServices {
    @Autowired
    private StudentRepository StudentRepo;

    public void saveStudent(StudentEntity studentEntity){
        StudentRepo.save(studentEntity);
    }

    public List<StudentEntity> getAll(){
    return StudentRepo.findAll();
    }
    public Optional<StudentEntity> findById(ObjectId id){
      return   StudentRepo.findById(id);
    }
    public void  deleteById(ObjectId id){
        StudentRepo.deleteById(id);
    }
}
