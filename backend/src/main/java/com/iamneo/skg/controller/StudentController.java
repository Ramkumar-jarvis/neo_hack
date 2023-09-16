package com.iamneo.skg.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.response.StudentListResponse;
import com.iamneo.skg.dto.response.StudentResponse;
import com.iamneo.skg.service.StudentService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.STUDENT_API_PATH)
@CrossOrigin
@RequiredArgsConstructor
@Tag(name = "Student")
public class StudentController {

	public final StudentService studentService;

	@GetMapping("/")
	public ResponseEntity<StudentListResponse> getAllStudents() {
		List<StudentResponse> studentList = new ArrayList<>();
		boolean hasData = !studentList.isEmpty();
		StudentListResponse response = new StudentListResponse(hasData, studentList);
		return ResponseEntity.ok().body(response);
	}
}
