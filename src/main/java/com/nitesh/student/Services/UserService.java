package com.nitesh.student.Services;

import com.nitesh.student.Entity.StudentEntity;
import com.nitesh.student.Entity.UserEntity;
import com.nitesh.student.Repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public void saveEntry(UserEntity userEntity){
        userRepo.save(userEntity);
    }

    public List<UserEntity> getAll(){
        return userRepo.findAll();
    }
    public Optional<UserEntity> findById(ObjectId id){
        return   userRepo.findById(id);
    }
    public void  deleteById(ObjectId id) {
        userRepo.deleteById(id);
    }
    public UserEntity findByUserName(String UserName)
    {
        try {
            return userRepo.findByUserName(UserName);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
