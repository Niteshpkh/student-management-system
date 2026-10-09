package com.nitesh.student.Repository;

import com.nitesh.student.Entity.StudentEntity;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<StudentEntity, String> {
   Page<StudentEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
