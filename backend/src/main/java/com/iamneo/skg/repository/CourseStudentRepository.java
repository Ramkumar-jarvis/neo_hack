package com.iamneo.skg.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.CourseStudent;

public interface CourseStudentRepository extends JpaRepository<CourseStudent, UUID> {

    CourseStudent findByStudentId(UUID studentId);

}
