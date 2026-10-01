package com.example.studentrecords.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.studentrecords.entity.User;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);
}