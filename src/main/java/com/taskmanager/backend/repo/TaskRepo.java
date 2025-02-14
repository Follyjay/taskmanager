package com.taskmanager.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.backend.model.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {}
