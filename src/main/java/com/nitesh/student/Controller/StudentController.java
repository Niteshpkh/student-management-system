package com.nitesh.student.Controller;

import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Services.StudentServices;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student_data")
public class StudentController {
    @Autowired
    private StudentServices studentService;


    @PostMapping
    public ResponseEntity<StudentEntity> saveStudent(@RequestBody StudentEntity studentEntity){
       try {
           studentService.saveStudent(studentEntity);
           return new ResponseEntity<>(HttpStatus.CREATED);
       }
       catch (Exception e)
       {
           return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       }

    }

    @GetMapping
   public ResponseEntity<List<StudentEntity>> getAll(){

        return  new ResponseEntity<>(studentService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<StudentEntity> findById( @PathVariable ObjectId id){
       Optional<StudentEntity> student = studentService.findById(id);
        if(student.isPresent()){
            return new ResponseEntity<>(studentService.findById(id).orElse(null) , HttpStatus.OK);
        }
       else{
           return  new ResponseEntity<>(HttpStatus.NOT_FOUND);        }
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable ObjectId id){
       studentService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<?> updateStudentById(@PathVariable ObjectId id, @RequestBody StudentEntity newEntry) {
        StudentEntity old = studentService.findById(id).orElse(null);
        if (old != null) {
            old.setAge(newEntry.getAge() != null ? newEntry.getAge() : old.getAge());
            old.setGrade(newEntry.getGrade() != null && !newEntry.getGrade().equals("") ? newEntry.getGrade() : old.getGrade());
            old.setName(newEntry.getName() != null && !newEntry.getName().equals("") ? newEntry.getName() : old.getName());
            old.setContact_no(newEntry.getContact_no() != null ? newEntry.getContact_no() : old.getContact_no());
            old.setParents_name(newEntry.getParents_name() != null && !newEntry.getParents_name().equals("") ? newEntry.getParents_name() : old.getParents_name());
            studentService.saveStudent(old);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
