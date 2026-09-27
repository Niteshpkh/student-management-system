package com.nitesh.student.Repository;

import com.nitesh.student.Entity.TeacherEntity;
import com.nitesh.student.dtos.TeacherResponseDTO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface TeacherRepository extends MongoRepository <TeacherEntity , ObjectId> {

}
