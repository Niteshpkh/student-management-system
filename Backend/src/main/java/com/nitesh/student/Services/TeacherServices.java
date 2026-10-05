package com.nitesh.student.Services;

import com.nitesh.student.Entity.TeacherEntity;
import com.nitesh.student.Repository.TeacherRepository;
import com.nitesh.student.dtos.TeacherRequestDTO;
import com.nitesh.student.dtos.TeacherResponseDTO;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherServices {

    private final TeacherRepository teacherRepository;

    public List<TeacherResponseDTO> getAllTeachers() {
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
                .subject(dto.getSubject())
                .build();
    }

    private void applyUpdates(TeacherEntity entity, TeacherRequestDTO dto) {
        if (dto.getTeachers_name() != null) {
            entity.setTeachers_name(dto.getTeachers_name());
        }
        if (dto.getEmail() != null) {
            entity.setEmail(dto.getEmail());
        }
        if (dto.getQualification() != null) {
            entity.setQualification(dto.getQualification());
        }
        if (dto.getTeacher_phone_no() != null) {
            entity.setTeacher_phone_no(dto.getTeacher_phone_no());
        }
        if (dto.getSubject() != null) {
            entity.setSubject(dto.getSubject());
        }
    }

    public TeacherResponseDTO updateTeacherBySubject(ObjectId id, TeacherRequestDTO teacherRequestDTO){
      TeacherEntity teacherEntity =  teacherRepository.findById(id).orElseThrow(()->new ResourceAccessException("Teacher is not found with the id" + id));
      teacherEntity.setSubject(teacherRequestDTO.getSubject());
      TeacherEntity savedTeacher = teacherRepository.save(teacherEntity);
      return TeacherResponseDTO.fromEntity(savedTeacher);
    }
}