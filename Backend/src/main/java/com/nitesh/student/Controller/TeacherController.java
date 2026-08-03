package com.nitesh.student.Controller;

import com.nitesh.student.Entity.TeacherEntity;
import com.nitesh.student.Services.TeacherServices;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teacher_data")
public class TeacherController {
    @Autowired
    public TeacherServices teacherServices;

    @PostMapping
    public ResponseEntity <TeacherEntity>  saveTeacher(@RequestBody TeacherEntity teacherEntity) {
        try {
            teacherServices.saveTeacher(teacherEntity);
            return new ResponseEntity<>(teacherEntity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity <List<TeacherEntity>> getAllTeacher(){
          return new ResponseEntity<>(teacherServices.getAllTeacher(), HttpStatus.OK);
    }

    @GetMapping("id/{id}")
    public ResponseEntity <TeacherEntity> findByTeacherId(@PathVariable ObjectId id ){
      Optional<TeacherEntity> teacher =  teacherServices.getTeacherById(id);
      if(teacher.isPresent()){
          return new ResponseEntity<>(teacher.get(), HttpStatus.OK);
      }
        return new ResponseEntity<>( HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("id/{id}")
    public ResponseEntity<?> deleteTeacherById(@PathVariable ObjectId id){
        teacherServices.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("id/{id}")
    public ResponseEntity<?> updateTeacherById(@PathVariable ObjectId id, @RequestBody TeacherEntity newTeacherEntry, HttpEntity<Object> httpEntity){
        TeacherEntity old = teacherServices.getTeacherById(id).orElse(null);
        if(old!=null){
            old.setEmail(newTeacherEntry.getEmail()!=null ? newTeacherEntry.getEmail(): old.getEmail());
            old.setQualification(newTeacherEntry.getQualification()!=null ? newTeacherEntry.getQualification() : old.getQualification());
            old.setTeacher_phone_no(newTeacherEntry.getTeacher_phone_no()!=null ? newTeacherEntry.getTeacher_phone_no() : old.getTeacher_phone_no());
            old.setEmail(newTeacherEntry.getEmail()!=null ? newTeacherEntry.getEmail() : old.getEmail());
            old.setSubject(newTeacherEntry.getSubject()!=null? newTeacherEntry.getSubject() : old.getSubject());
            old.setTeachers_name(newTeacherEntry.getTeachers_name()!=null ? newTeacherEntry.getTeachers_name() : old.getTeachers_name());

            return new ResponseEntity<>(old, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }

}
