package com.taskmanager.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        taskService.createTask(task);
        return new ResponseEntity<Task>(task, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        Task task = taskService.getTaskById(id);
        return new ResponseEntity<Task>(task, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task){
        taskService.updateTask(id, task);
        return new ResponseEntity<Task>(task, HttpStatus.OK);
    }

    @PutMapping("complete/{id}")
    public ResponseEntity<Void> setTaskCompleted(@PathVariable Long id){
        taskService.setTaskCompleted(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
}
