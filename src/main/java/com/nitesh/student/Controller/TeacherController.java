package com.nitesh.student.Controller;

import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Entity.TeacherEntity;
import com.nitesh.student.Services.TeacherServices;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher_data")
public class TeacherController {
    @Autowired
    public TeacherServices teacherServices;

    @PostMapping
    public TeacherEntity  saveTeacher(@RequestBody TeacherEntity teacherEntity){
        teacherServices.saveTeacher(teacherEntity);
        return teacherEntity;
    }

    @GetMapping
    public List<TeacherEntity> getAllTeacher(){
       return teacherServices.getAllTeacher();
    }

    @GetMapping("id/{id}")
    public void findByTeacherId(@PathVariable ObjectId id ){
        teacherServices.getTeacherById(id);

    }
    @DeleteMapping("id/{id}")
    public void deleteTeacherById(@PathVariable ObjectId id){
        teacherServices.deleteById(id);
    }

    @PutMapping("id/{id}")
    public TeacherEntity updateTeacherById(@PathVariable ObjectId id, @RequestBody TeacherEntity newTeacherEntry){
        TeacherEntity old = teacherServices.getTeacherById(id).orElse(null);
        if(old!=null){
            old.setEmail(newTeacherEntry.getEmail()!=null ? newTeacherEntry.getEmail(): old.getEmail());
            old.setQualification(newTeacherEntry.getQualification()!=null ? newTeacherEntry.getQualification() : old.getQualification());
            old.setTeacher_phone_no(newTeacherEntry.getTeacher_phone_no()!=null ? newTeacherEntry.getTeacher_phone_no() : old.getTeacher_phone_no());
            old.setEmail(newTeacherEntry.getEmail()!=null ? newTeacherEntry.getEmail() : old.getEmail());
            old.setSubject(newTeacherEntry.getSubject()!=null? newTeacherEntry.getSubject() : old.getSubject());
            old.setTeachers_name(newTeacherEntry.getTeachers_name()!=null ? newTeacherEntry.getTeachers_name() : old.getTeachers_name());

            return old;
        }
        else{
            return null;
        }


    }

}
