import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSquareCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from './utility';
import './App.css';

const URL = "http://localhost:8080/tasks";

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const addTask = async () => {
    if (!newTitle) return alert("Please enter a title");
    if (!newDescription) return alert("Please enter a description");
    try{
      await axios.post(URL, {title: newTitle, description: newDescription},
        { headers: { "Content-Type": "application/json" } });
        fetchTasks();
        setNewTitle("");
        setNewDescription("");
        alert("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
        alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setShowModal(true);
  };

  const updateTask = async (id) => {
    try{
      await axios.put(`${URL}/${id}`, {title: updatedTitle, description: updatedDescription},
        { headers: { "Content-Type": "application/json" } });
        fetchTasks();
        setEditingTask(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
        alert("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const completeTask = async (id) => {
    try{
      await axios.put(`${URL}/complete/${id}`);
        fetchTasks();
        alert("Task completed successfully");
    } catch (error) {
      console.error("Error completing task:", error.message);
    }
  };

  return (
    <div className="task-container">
      <h1 className="title">Task Management System</h1>
      <div className="task-form">
        <input
          className="task-input text"
          type="text"
          placeholder="Enter title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea 
          className="task-input text"
          rows="4" cols="35"
          placeholder="Enter description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}>
        </textarea>
        <button className="task-input add-task" onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dateCreated}</td>
                  <td>{task.completed ? "complete" : "pending"}</td>
                  <td>
                    <span className="task-action delete" title="delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrash}/>
                    </span>
                    <span className="task-action edit" id="btnEdit" title="edit" onClick={() => {editTask(task)}}>
                      <FontAwesomeIcon icon={faEdit}/>
                    </span>
                    <button className="task-action complete" title="complete" onClick={() => completeTask(task.id)}>
                      <FontAwesomeIcon icon={faSquareCheck}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No tasks found. Add a new task!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingTask && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="task-form-edit">
            <input
              className="task-input text"
              type="text"
              placeholder="Update title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea 
              className="task-input text"
              rows="4" cols="35"
              placeholder="Update description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}>
            </textarea>
            <button className="task-input update-task" onClick={() => updateTask(editingTask.id)}>Update Task</button>
          </div>
        </Modal>
      )}
    </div>

  );
};
export default App;