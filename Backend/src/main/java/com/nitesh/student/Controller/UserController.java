package com.nitesh.student.Controller;

import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Services.UserService;
import com.nitesh.student.dtos.UserRequestDTO;
import com.nitesh.student.dtos.UserResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserController {

    @Autowired
    private UserService userService;

    // 1. Create User
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO createdUser = userService.createUser(userRequestDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // 2. Get All Users (Returns List<UserResponseDTO> matching userService.getAllUsers())
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 3. Get User By ID (Matches findByUserId returning Optional<UserResponseDTO>)
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable String id) {
        Optional<UserResponseDTO> user = userService.findByUserId(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. Update User (Matches updateUser(UserRequestDTO, String) which hashes passwords & saves in service)
    @PutMapping("/id/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@RequestBody UserRequestDTO newUser, @PathVariable String id) {
        UserEntity updatedUser = userService.updateUser(newUser, id);
        if (updatedUser != null) {
            return ResponseEntity.ok(UserResponseDTO.fromEntity(updatedUser));
        }
        return ResponseEntity.notFound().build();
    }

    // 5. Delete User (Matches deleteUser(id) which returns boolean)
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable String id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // 6. Get Current Authenticated User
    @GetMapping("/current")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userName = authentication.getName();
        // Since findByUserId expects an ID or you look up by username:
        return userService.getAllUsers().stream()
                .filter(u -> userName.equals(u.getUserName()))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}