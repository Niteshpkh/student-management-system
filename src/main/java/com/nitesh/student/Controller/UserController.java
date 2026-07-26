package com.nitesh.student.Controller;

import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Services.UserServices;
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
    private UserServices userService;

    @GetMapping
    public List<UserEntity> getUser(){
        return userService.getAllUser();
    }

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody UserEntity user){
        userService.saveUser(user);
      return new ResponseEntity<>(HttpStatus.CREATED);
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

    @DeleteMapping ("/{id}")
    public  ResponseEntity<?> deleteUserById(@PathVariable String id){
        userService.deleteByUserId(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping ("/{UserName}")
    public ResponseEntity<?> getUserByUserName (@PathVariable String UserName){
       Optional<UserEntity> user = Optional.ofNullable(userService.findByUserName(UserName));
       if(user.isPresent()){
           return  new ResponseEntity<>(user.get(), HttpStatus.OK);
       }
       else  {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }

    }


}
