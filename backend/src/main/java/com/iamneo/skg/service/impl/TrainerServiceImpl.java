package com.iamneo.skg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.response.TrainerResponse;
import com.iamneo.skg.model.enumerated.Role;
import com.iamneo.skg.repository.UserRepository;
import com.iamneo.skg.service.TrainerService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService{	
	
	private final UserRepository userRepository;
	
	@Override
	public List<TrainerResponse> getAllTrainers() {
	    return userRepository
	            .findAllByRole(Role.TRAINER)
	            .stream()
	            .map(user -> new TrainerResponse(user.getId(), user.getFirstName() + " " + user.getLastName(), user.getEmail()))
	            .collect(Collectors.toList());
	}
}
