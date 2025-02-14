package com.taskmanager.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.repo.TaskRepo;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepo taskRepo;

    public void createTask(Task task) {
        taskRepo.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepo.findById(id).orElse(null);
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }

    public void updateTask(Long id, Task task) {
        
        Task existingTask = taskRepo.findById(id).orElse(null);

        if (existingTask != null) {
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setCompleted(task.isCompleted());
            taskRepo.save(existingTask);
        }
    }

    public void setTaskCompleted(Long id) {
        Task task = taskRepo.findById(id).orElse(null);
        if (task != null) {
            task.setCompleted(true);
            taskRepo.save(task);
        }
    }
        
}
