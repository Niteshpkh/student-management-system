package com.nitesh.student.dtos;

import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private String id;
private String userName;
private Role role;
private String studentId;
private String teacherId;

public static UserResponseDTO fromEntity(UserEntity entity) {
    if (entity == null) return null;
    return UserResponseDTO.builder()
            .id(entity.getId())
            .userName(entity.getUserName())
            .studentId(entity.getStudentId())
            .teacherId(entity.getTeacherId())
            .role(entity.getRole())
            .build();
}
}
