package com.iamneo.skg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.response.StudentResponse;
import com.iamneo.skg.model.enumerated.Role;
import com.iamneo.skg.repository.UserRepository;
import com.iamneo.skg.service.StudentService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{
	
	private final UserRepository userRepository;

	@Override
	public List<StudentResponse> getAllStudents() {
		return userRepository
	            .findAllByRole(Role.STUDENT)
	            .stream()
	            .map(user -> new StudentResponse(user.getId(), user.getFirstName() + " " + user.getLastName(), user.getEmail(), user.getRegistrationNumber()))
	            .collect(Collectors.toList());
	}

}
