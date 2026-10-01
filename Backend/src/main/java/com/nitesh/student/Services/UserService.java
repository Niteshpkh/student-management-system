package com.nitesh.student.Services;

import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Repository.UserRepository;
import com.nitesh.student.dtos.UserRequestDTO;
import com.nitesh.student.dtos.UserResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class UserService {
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public UserResponseDTO createUser(UserRequestDTO userRequestDTO){
        UserEntity userEntity = UserEntity.builder()
                .userName(userRequestDTO.getUserName())
                .password(passwordEncoder.encode(userRequestDTO.getPassword()))
                .role(userRequestDTO.getRole())
                .studentId(userRequestDTO.getStudentId())
                .teacherId(userRequestDTO.getTeacherId())
                .build();

        UserEntity savedUser = userRepository.save((userEntity));
                return UserResponseDTO.fromEntity(savedUser);
    }

    public List <UserResponseDTO> getAllUsers(){
        return  userRepository.findAll()
                .stream()
                .map(UserResponseDTO::fromEntity)
                .toList();
    }

    public Optional <UserResponseDTO> findByUserId( String id){
      return userRepository.findById(id)
               .map(UserResponseDTO::fromEntity);
    }

    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public UserEntity updateUser(UserRequestDTO updatedUser , String id){
        return userRepository.findById(id)
                .map(existingUser-> {
                    if (updatedUser.getUserName() != null && !updatedUser.getUserName().isBlank()){
                        existingUser.setUserName(updatedUser.getUserName().trim());
                    }
                    if (updatedUser.getRole() != null ) {
                        existingUser.setRole(updatedUser.getRole());
                    }
                    // Hash new password if provided
                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
                        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                    }
                    if(updatedUser.getStudentId() != null && !updatedUser.getStudentId().isBlank()) {
                        existingUser.setStudentId(updatedUser.getStudentId());
                    }
                        else {
                            existingUser.setStudentId(null);
                        }

                    if(updatedUser.getTeacherId() != null && !updatedUser.getTeacherId().isBlank()) {
                        existingUser.setTeacherId(updatedUser.getTeacherId());
                    }
                    else {
                        existingUser.setTeacherId(null);
                    }
                    // Save and return the updated entity
                    return userRepository.save(existingUser);
                })
                .orElse(null); // Return null so the controller can return 404
    }
}
