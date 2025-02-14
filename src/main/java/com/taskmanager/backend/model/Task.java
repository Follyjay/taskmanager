package com.taskmanager.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean completed = false;
    private LocalDate dateCreated = LocalDate.now();

    

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public boolean isCompleted() {return completed;}
    public void setCompleted(boolean completed) {this.completed = true;}
}
