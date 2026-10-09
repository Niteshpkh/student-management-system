package com.nitesh.student.Controller;
import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Services.StudentServices;
import com.nitesh.student.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/student_data")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentServices studentService;

    @Autowired
    private UserService userService;

    // Save Student
    @PostMapping
    public ResponseEntity<?> saveStudent(@RequestBody StudentEntity studentEntity) {
        studentService.saveStudent(studentEntity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity <?> getAllStudents(@RequestParam (defaultValue = "0") int Page,
                                             @RequestParam (defaultValue = "10") int Size,
                                             @RequestParam (defaultValue = "name") String sortBy,
                                             @RequestParam(defaultValue = "asc") String direction,
                                             @RequestParam(required = false) String search
    ) {
        Page<StudentEntity> studentPage = studentService.getStudents(page, size, sortBy, direction, search);

        Map<String, Object> response = new HashMap<>();
        response.put("students", studentPage.getContent());
        response.put("currentPage", studentPage.getNumber());
        response.put("totalElements", studentPage.getTotalElements());
        response.put("totalPages", studentPage.getTotalPages());
        response.put("pageSize", studentPage.getSize());
        response.put("hasNext", studentPage.hasNext());
        response.put("hasPrevious", studentPage.hasPrevious());

        return ResponseEntity.ok(response);
    }
    }

    // Get Student By Id
    @GetMapping("/id/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {

        Optional<StudentEntity> student = studentService.findById(id);

        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id) {

        studentService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Update Student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudentById(
            @PathVariable String id,
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
    @GetMapping("/me")
    public ResponseEntity<?> getMyDetails(Authentication authentication) {

        String username = authentication.getName();

        StudentEntity student = studentService.getMyStudent(username);

        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(student);
    }
}