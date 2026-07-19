package com.nitesh.student.Controller;

import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Services.StudentServices;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student_data")
public class StudentController {
    @Autowired
    private StudentServices studentService;


    @PostMapping
    public StudentEntity saveStudent(@RequestBody StudentEntity studentEntity){
        studentService.saveStudent(studentEntity);
        return studentEntity;
    }
    @GetMapping
   public List <StudentEntity> getAll(){
      return  studentService.getAll();
    }
    @GetMapping("id/{id}")
    public StudentEntity findById( @PathVariable ObjectId id){
        return studentService.findById(id).orElse(null);
    }
    @DeleteMapping("id/{id}")
    public boolean deleteById(@PathVariable ObjectId id){
        studentService.deleteById(id);
        return true;
    }
    @PutMapping("id/{id}")
    public StudentEntity updateStudentById(@PathVariable ObjectId id, @RequestBody StudentEntity newEntry) {
        StudentEntity old = studentService.findById(id).orElse(null);
        if (old != null) {
            old.setAge(newEntry.getAge() != null ? newEntry.getAge() : old.getAge());
            old.setGrade(newEntry.getGrade() != null && !newEntry.getGrade().equals("") ? newEntry.getGrade() : old.getGrade());
            old.setName(newEntry.getName() != null && !newEntry.getName().equals("") ? newEntry.getName() : old.getName());
            old.setContact_no(newEntry.getContact_no() != null ? newEntry.getContact_no() : old.getContact_no());
            old.setParents_name(newEntry.getParents_name() != null && !newEntry.getParents_name().equals("") ? newEntry.getParents_name() : old.getParents_name());
            studentService.saveStudent(old);
            return old;
        } else {
            return null;
        }
    }
}
