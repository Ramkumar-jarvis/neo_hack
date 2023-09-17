package com.iamneo.skg.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.Topic;

public interface TopicRepository extends JpaRepository<Topic, UUID> {

    List<Topic> findByCourseId(UUID id);

}
