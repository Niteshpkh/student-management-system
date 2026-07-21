package com.nitesh.student.Services;

import com.nitesh.student.Entity.TeacherEntity;
import com.nitesh.student.Repository.TeacherRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TeacherServices {
    @Autowired
    public TeacherRepository TeacherRepo;

    public void saveTeacher(TeacherEntity teacherEntity){
        TeacherRepo.save(teacherEntity);
    }

    public List<TeacherEntity> getAllTeacher(){
      return   TeacherRepo.findAll();
    }

    public Optional<TeacherEntity> getTeacherById(ObjectId id){
        return TeacherRepo.findById(id);
    }

    public void deleteById(ObjectId id){
        TeacherRepo.deleteById(id);
    }


}
