package com.nitesh.student.Controller;

import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Services.StudentServices;
import com.nitesh.student.Services.UserService;
import org.apache.catalina.User;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserEntity> getAllUser(){
        return userService.getAll();
    }
   @PostMapping
    public void createNewUser(@RequestBody UserEntity user){
        userService.saveEntry(user);
    }
    @PutMapping("/{userName}")
    public ResponseEntity<?> updateUser(@RequestBody UserEntity userEntity, @PathVariable String userName)
    {
     UserEntity UserInDb =  userService.findByUserName(userName);
     if(UserInDb != null){
        UserInDb.setUserName(userEntity.getUserName());
        UserInDb.setPassword(userEntity.getPassword());
        userService.saveEntry(UserInDb);
     }
     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
