package com.nitesh.student.Repository;

import com.nitesh.student.Entity.TeacherEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface TeacherRepository extends MongoRepository <TeacherEntity , ObjectId> {


}
