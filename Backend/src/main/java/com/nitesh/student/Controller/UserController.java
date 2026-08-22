package com.nitesh.student.Controller;

import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins =  "http://localhost:5173, http://localhost:5174")

public class UserController {

    @Autowired
    private UserServices userService;

    @GetMapping
    public List<UserEntity> getUser(){
        return userService.getAllUser();
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        Optional<UserEntity> user = userService.findByUserId(id);
        if(user.isPresent()){
            return new ResponseEntity<>(user.get() ,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping ("/id/{id}")
    public  ResponseEntity<?> deleteUserById(@PathVariable String id){
        userService.deleteByUserId(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping ("/UserName/{UserName}")
    public ResponseEntity<?> getUserByUserName (@PathVariable String UserName){
       Optional<UserEntity> user = Optional.ofNullable(userService.findByUserName(UserName));
       if(user.isPresent()){
           return  new ResponseEntity<>(user.get(), HttpStatus.OK);
       }
       else  {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }

    }
    @PutMapping("/id/{id}")
    public ResponseEntity<?> updateUserById(@RequestBody UserEntity newUser, @PathVariable String id){
        Optional<UserEntity> oldUser = userService.findByUserId(id);
        if(oldUser.isPresent()){
            UserEntity user = oldUser.get();
            if(newUser.getRole()!=null){
            user.setRole(newUser.getRole());
            }
            if(newUser.getUserName()!=null) {
                user.setUserName(newUser.getUserName());
            }
            if(newUser.getPassword()!=null) {
                user.setPassword(newUser.getPassword());
            }
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/current")
    public UserEntity getCurrentUser(Authentication authentication){
        String userName = authentication.getName();
        return userService.getCurrentUser(userName);
    }

}
