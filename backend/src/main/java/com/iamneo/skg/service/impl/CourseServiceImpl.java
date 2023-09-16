package com.iamneo.skg.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.TimeZone;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.request.CourseCreationRequest;
import com.iamneo.skg.model.Course;
import com.iamneo.skg.repository.CourseRepository;
import com.iamneo.skg.service.CourseService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public boolean createCourse(CourseCreationRequest courseCreationRequest) throws ParseException {
        Optional<Course> isCourseExists = courseRepository
                .findByOrderId(UUID.fromString(courseCreationRequest.getOrderId()));

        if (isCourseExists.isPresent()) {
            return false;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date startDate = sdf.parse(courseCreationRequest.getStartDate());
        Date endDate = sdf.parse(courseCreationRequest.getEndDate());

        Course course = Course.builder()
                .courseName(courseCreationRequest.getCourseName())
                .orderId(UUID.fromString(courseCreationRequest.getOrderId()))
                .startDate(startDate)
                .endDate(endDate)
                .createdBy(UUID.fromString(courseCreationRequest.getId()))
                .updatedBy(UUID.fromString(courseCreationRequest.getId()))
                .build();

        courseRepository.save(course);
        return true;
    }

}
