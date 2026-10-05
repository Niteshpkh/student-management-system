package com.nitesh.student.Controller;

import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.JavaUtils.JwtUtils;
import com.nitesh.student.Repository.UserRepository;
import com.nitesh.student.Services.UserService;
import com.nitesh.student.dtos.UserRequestDTO;
import com.nitesh.student.dtos.UserResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {

    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser( @RequestBody UserRequestDTO loginRequest) {
        System.out.println(">>> Incoming Login Username: [" + loginRequest.getUserName() + "]");
        System.out.println(">>> Incoming Login Password: [" + loginRequest.getPassword() + "]");

        Optional<UserEntity> userOpt = Optional.ofNullable(userRepository.findByUserName(loginRequest.getUserName()));

        if (userOpt.isEmpty()) {
            System.out.println(">>> FAIL: User was NOT found in MongoDB!");
        } else {
            UserEntity user = userOpt.get();
            System.out.println(">>> SUCCESS: User found in MongoDB: " + user.getUserName());
            System.out.println(">>> Stored Hash: [" + user.getPassword() + "]");

            boolean matches = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
            System.out.println(">>> Does BCrypt match raw password? " + matches);
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUserName(),
                            loginRequest.getPassword()
                    )
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUserName());
            String jwt = jwtUtils.generateToken(userDetails.getUsername());

            ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                    .httpOnly(true)
                    .secure(false) // Set to true in production with HTTPS
                    .path("/")
                    .maxAge(60 * 60)
                    .sameSite("Lax")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body("Login successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO createdUser = userService.createUser(userRequestDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}