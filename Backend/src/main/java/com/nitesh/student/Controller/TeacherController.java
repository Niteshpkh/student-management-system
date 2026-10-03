package com.nitesh.student.Controller;

import com.nitesh.student.Services.TeacherServices;
import com.nitesh.student.dtos.TeacherRequestDTO;
import com.nitesh.student.dtos.TeacherResponseDTO;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher_data")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherServices teacherServices;

    @PostMapping
    public ResponseEntity<TeacherResponseDTO> createTeacher(@RequestBody TeacherRequestDTO teacherRequestDTO) {
        TeacherResponseDTO response = teacherServices.createTeacher(teacherRequestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TeacherResponseDTO>> getAllTeachers() {
        List<TeacherResponseDTO> teachers = teacherServices.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<TeacherResponseDTO> findByTeacherId(@PathVariable ObjectId id) {
        return teacherServices.getTeacherById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<TeacherResponseDTO> updateTeacherById(
            @PathVariable ObjectId id,
            @RequestBody TeacherRequestDTO teacherRequestDTO) {

        return teacherServices.updateTeacher(id, teacherRequestDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> deleteTeacherById(@PathVariable ObjectId id) {
        boolean deleted = teacherServices.deleteTeacher(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PatchMapping("/{id}/subject")
    public ResponseEntity<TeacherResponseDTO> updateTeacherBySubject(@RequestBody TeacherRequestDTO dto, @PathVariable ObjectId id){
       TeacherResponseDTO responseDTO =  teacherServices.updateTeacherBySubject(id, dto);
       return ResponseEntity.ok(responseDTO);

    }
}