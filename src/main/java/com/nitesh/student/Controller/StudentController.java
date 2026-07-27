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

    // Save Student
    @PostMapping
    public ResponseEntity<?> saveStudent(@RequestBody StudentEntity studentEntity) {
        studentService.saveStudent(studentEntity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Get All Students
    @GetMapping
    public ResponseEntity<List<StudentEntity>> getAllStudents() {
        List<StudentEntity> students = studentService.getAllStudent();

        if (!students.isEmpty()) {
            return new ResponseEntity<>(students, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get Student By Id
    @GetMapping("/id/{id}")
    public ResponseEntity<?> findById(@PathVariable ObjectId id) {

        Optional<StudentEntity> student = studentService.findById(id);

        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete Student
    @DeleteMapping("/id/{id}")
    public ResponseEntity<?> deleteById(@PathVariable ObjectId id) {

        studentService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Update Student
    @PutMapping("/id/{id}")
    public ResponseEntity<?> updateStudentById(
            @PathVariable ObjectId id,
            @RequestBody StudentEntity newEntry) {

        StudentEntity old = studentService.findById(id).orElse(null);

        if (old != null) {

            old.setName(newEntry.getName() != null && !newEntry.getName().isBlank()
                    ? newEntry.getName()
                    : old.getName());

            old.setAge(newEntry.getAge() != null
                    ? newEntry.getAge()
                    : old.getAge());

            old.setGrade(newEntry.getGrade() != null && !newEntry.getGrade().isBlank()
                    ? newEntry.getGrade()
                    : old.getGrade());

            old.setContact_no(newEntry.getContact_no() != null
                    ? newEntry.getContact_no()
                    : old.getContact_no());

            old.setParents_name(newEntry.getParents_name() != null && !newEntry.getParents_name().isBlank()
                    ? newEntry.getParents_name()
                    : old.getParents_name());

            studentService.saveStudent(old);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}