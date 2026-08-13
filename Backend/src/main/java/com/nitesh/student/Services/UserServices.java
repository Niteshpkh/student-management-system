package com.nitesh.student.Services;

import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserServices {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void saveUser(UserEntity user){

        System.out.println("Password Before hashing" + user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("Password After hashing" +user.getPassword());
        userRepo.save(user);
    }

    public List<UserEntity> getAllUser(){
       return userRepo.findAll();
    }

    public Optional<UserEntity> findByUserId(String id){
        return userRepo.findById(id);

    }
    public void deleteByUserId(String id){
        userRepo.deleteById(id);
    }
    public UserEntity findByUserName(String userName){
        return userRepo.findByUserName(userName);
    }

    public UserEntity updateUserById(UserEntity newUser ,String id){
        Optional <UserEntity> oldUser = userRepo.findById(id);
        if(oldUser.isPresent()){
            UserEntity user = oldUser.get();
            user.setPassword(newUser.getPassword());
            user.setUserName(newUser.getUserName());
            user.setRole(newUser.getRole());
            userRepo.save(user);


        }
        return null;
    }

    public UserEntity updateByUserName(UserEntity newUser, String UserName){
        Optional<UserEntity> oldUser = Optional.ofNullable(userRepo.findByUserName(UserName));
        if(oldUser.isPresent()){
            UserEntity user = oldUser.get();
            user.setRole(newUser.getRole());
            user.setPassword(newUser.getPassword());
            userRepo.save(user);
            return  user;
        }
        return null;

    }
    public UserEntity authenticateUser(String userName, String password){
        UserEntity user = userRepo.findByUserName(userName);
        if(user!=null &&  passwordEncoder.matches(password, user.getPassword())){
            return  user;
        }
        else {
           return null;
        }
    }
}
