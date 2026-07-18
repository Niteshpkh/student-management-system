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
}
