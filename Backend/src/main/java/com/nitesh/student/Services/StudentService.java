package com.nitesh.student.Services;

import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Repository.StudentRepository;
import com.nitesh.student.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private UserRepository userRepo;

    // Save student
    public void saveStudent(StudentEntity studentEntity) {
        studentRepo.save(studentEntity);
    }

    // Get all students
    public List<StudentEntity> getAllStudent() {
        return studentRepo.findAll();
    }

    // Find student by ID
    public Optional<StudentEntity> findById(String id) {
        return studentRepo.findById(id);
    }

    // Delete student by ID
    public void deleteById(String id) {
        studentRepo.deleteById(id);
    }

    // Get details of the currently logged-in student
    public StudentEntity getMyStudent(String username) {
        UserEntity user = userRepo.findByUserName(username);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        // Safe conversion: handles Enum or String, case-insensitively
        String roleStr = String.valueOf(user.getRole()).trim();
        if (!"STUDENT".equalsIgnoreCase(roleStr)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not a student");
        }

        if (user.getStudentId() == null || user.getStudentId().toString().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No student profile linked to this account");
        }

        return studentRepo.findById(user.getStudentId().toString())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student profile record not found"));
    }

    public Page<StudentEntity> getStudents(int page, int size, String sortBy, String direction, String search) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        if (search != null && !search.trim().isEmpty()) {
            return studentRepo.findByNameContainingIgnoreCase(search.trim(), pageable);
        }
        return studentRepo.findAll(pageable);
    }
}