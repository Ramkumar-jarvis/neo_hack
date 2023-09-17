package com.iamneo.skg.service.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.response.StudentCalenderResponse;
import com.iamneo.skg.dto.response.StudentResponse;
import com.iamneo.skg.model.Course;
import com.iamneo.skg.model.Topic;
import com.iamneo.skg.model.User;
import com.iamneo.skg.model.enumerated.Role;
import com.iamneo.skg.repository.CourseRepository;
import com.iamneo.skg.repository.CourseStudentRepository;
import com.iamneo.skg.repository.TopicRepository;
import com.iamneo.skg.repository.UserRepository;
import com.iamneo.skg.service.StudentService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

	private final UserRepository userRepository;
	private final CourseStudentRepository courseStudentRepository;
	private final CourseRepository courseRepository;
	private final TopicRepository topicRepository;

	@Override
	public List<StudentResponse> getAllStudents() {
		return userRepository
				.findAllByRole(Role.STUDENT)
				.stream()
				.map(user -> new StudentResponse(user.getId(), user.getFirstName() + " " + user.getLastName(),
						user.getEmail(), user.getRegistrationNumber()))
				.collect(Collectors.toList());
	}

	@Override
	public StudentCalenderResponse getStudentCalender(String studentId) {
		var courseStudent = courseStudentRepository.findByStudentId(UUID.fromString(studentId));
		System.out.println(courseStudent.getCourseId());
		Course course = courseRepository.findById(courseStudent.getCourseId()).orElseThrow();
		User student = userRepository.findById(courseStudent.getStudentId()).orElseThrow();
		List<Topic> topics = topicRepository.findByCourseId(course.getId());
		System.out.println(course.getCourseName());
		System.out.println(student.getUsername());
		for (Topic topic : topics) {
			System.out.println(topic.getTopicName());
		}
		return null;
	}

}
