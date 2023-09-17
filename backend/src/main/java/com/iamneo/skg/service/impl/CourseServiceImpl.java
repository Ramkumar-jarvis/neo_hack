package com.iamneo.skg.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.request.CourseCreationRequest;
import com.iamneo.skg.model.Course;
import com.iamneo.skg.model.CourseStudent;
import com.iamneo.skg.model.CourseTrainer;
import com.iamneo.skg.repository.CourseRepository;
import com.iamneo.skg.repository.CourseStudentRepository;
import com.iamneo.skg.repository.CourseTrainerRepository;
import com.iamneo.skg.service.CourseService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseStudentRepository courseStudentRepository;
    private final CourseTrainerRepository courseTrainerRepository;

    @Override
    public boolean createCourse(CourseCreationRequest courseCreationRequest) throws ParseException {
        if (courseRepository.findByOrderId(UUID.fromString(courseCreationRequest.getOrderId())).isPresent()) {
            return false;
        }

        Date startDate = parseDate(courseCreationRequest.getStartDate());
        Date endDate = parseDate(courseCreationRequest.getEndDate());

        Course course = createCourseEntity(courseCreationRequest, startDate, endDate);

        List<CourseStudent> courseStudents = createCourseEntities(
                courseCreationRequest.getStudentId(),
                studentId -> createCourseStudentEntity(course, courseCreationRequest, studentId));

        List<CourseTrainer> courseTrainers = createCourseEntities(
                courseCreationRequest.getTrainerId(),
                trainerId -> createCourseTrainerEntity(course, courseCreationRequest, trainerId));

        courseStudentRepository.saveAll(courseStudents);
        courseTrainerRepository.saveAll(courseTrainers);

        return true;
    }

    private Date parseDate(String dateStr) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        return sdf.parse(dateStr);
    }

    private Course createCourseEntity(CourseCreationRequest request, Date startDate, Date endDate) {
        var course = Course.builder()
                .courseName(request.getCourseName())
                .orderId(UUID.fromString(request.getOrderId()))
                .startDate(startDate)
                .endDate(endDate)
                .createdBy(UUID.fromString(request.getId()))
                .updatedBy(UUID.fromString(request.getId()))
                .build();
        courseRepository.save(course);
        return courseRepository.findByOrderId(UUID.fromString(request.getOrderId())).orElseThrow();
    }

    private <T> List<T> createCourseEntities(List<String> ids, Function<String, T> entityBuilder) {
        return ids.stream()
                .map(entityBuilder)
                .collect(Collectors.toList());
    }

    private CourseStudent createCourseStudentEntity(Course course, CourseCreationRequest request, String studentId) {
        return CourseStudent.builder()
                .courseId(course.getId())
                .branchId(UUID.fromString(request.getBranchId()))
                .departmentId(UUID.fromString(request.getDepartmentId()))
                .courseActivationStatus(0L)
                .session_1(1L)
                .session_2(1L)
                .studentId(UUID.fromString(studentId))
                .build();
    }

    private CourseTrainer createCourseTrainerEntity(Course course, CourseCreationRequest request, String trainerId) {
        return CourseTrainer.builder()
                .courseId(course.getId())
                .trainerId(UUID.fromString(trainerId))
                .branchId(UUID.fromString(request.getBranchId()))
                .departmentId(UUID.fromString(request.getDepartmentId()))
                .courseActivationStatus(0L)
                .courseDeliveryCompletion(0.0)
                .build();
    }

}
