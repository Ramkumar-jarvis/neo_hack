package com.iamneo.skg.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.Course;

public interface CourseRepository extends JpaRepository<Course, UUID> {

    Optional<Course> findByOrderId(UUID orderId);

    Optional<Course> findByCourseName(String courseName);

}
