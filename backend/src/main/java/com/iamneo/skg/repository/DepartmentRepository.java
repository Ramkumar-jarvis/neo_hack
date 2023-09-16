package com.iamneo.skg.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, UUID> {

}
