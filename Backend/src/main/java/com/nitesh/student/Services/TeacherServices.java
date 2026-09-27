package com.nitesh.student.Services;

import com.nitesh.student.Entity.TeacherEntity;
import com.nitesh.student.Repository.TeacherRepository;
import com.nitesh.student.dtos.TeacherRequestDTO;
import com.nitesh.student.dtos.TeacherResponseDTO;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherServices {
    private final TeacherRepository teacherRepository;

    public List<TeacherResponseDTO> getAllTeachers(){
        return teacherRepository.findAll()
                .stream()
                .map(TeacherResponseDTO::fromEntity)
                .toList();
    }

    public Optional<TeacherResponseDTO> getTeacherById(ObjectId id) {
        return teacherRepository.findById(id)
                .map(TeacherResponseDTO::fromEntity);
    }

    public TeacherResponseDTO createTeacher(TeacherRequestDTO dto) {
        TeacherEntity entity = mapToEntity(dto);
        TeacherEntity savedEntity = teacherRepository.save(entity);
        return TeacherResponseDTO.fromEntity(savedEntity);
    }

    public Optional<TeacherResponseDTO> updateTeacher(ObjectId id, TeacherRequestDTO dto) {
        return teacherRepository.findById(id).map(existingTeacher -> {
            applyUpdates(existingTeacher, dto);
            // Explicitly call save to persist mutations back to MongoDB
            TeacherEntity updatedEntity = teacherRepository.save(existingTeacher);
            return TeacherResponseDTO.fromEntity(updatedEntity);
        });
    }

    public boolean deleteTeacher(ObjectId id) {
        if (!teacherRepository.existsById(id)) {
            return false;
        }
        teacherRepository.deleteById(id);
        return true;
    }

    private TeacherEntity mapToEntity(TeacherRequestDTO dto) {
        return TeacherEntity.builder()
                .teachers_name(dto.getTeachers_name())
                .email(dto.getEmail())
                .qualification(dto.getQualification())
                .teacher_phone_no(dto.getTeacher_phone_no())
                .Subject(dto.getSubject())
                .build();
    }

    private void applyUpdates(TeacherEntity entity, TeacherRequestDTO dto) {
        entity.setTeachers_name(dto.getTeachers_name());
        entity.setEmail(dto.getEmail());
        entity.setQualification(dto.getQualification());
        entity.setTeacher_phone_no(dto.getTeacher_phone_no());
        entity.setSubject(dto.getSubject());
    }



}