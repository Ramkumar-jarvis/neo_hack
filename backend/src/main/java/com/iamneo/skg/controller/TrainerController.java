package com.iamneo.skg.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.response.TrainerResponse;
import com.iamneo.skg.service.TrainerService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.TRAINER_API_PATH)
@CrossOrigin("*")
@RequiredArgsConstructor
@Tag(name = "Trainer")
public class TrainerController {
	
	public final TrainerService trainerService;
	
	@GetMapping("/")
	public ResponseEntity<List<TrainerResponse>> getAllTrainers(){
		List<TrainerResponse> trainerList = trainerService.getAllTrainers();
		return trainerList.size() > 0 ? ResponseEntity.status(200).body(trainerList) : ResponseEntity.status(500).body(null);
	}
}
