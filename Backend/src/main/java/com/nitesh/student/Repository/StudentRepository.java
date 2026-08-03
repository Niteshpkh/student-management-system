package com.nitesh.student.Repository;

import com.nitesh.student.Entity.StudentEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<StudentEntity, ObjectId> {

}
