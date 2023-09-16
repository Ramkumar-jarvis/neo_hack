package com.iamneo.skg.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.User;
import com.iamneo.skg.model.enumerated.Role;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

	List<User> findAllByRole(Role role);
}