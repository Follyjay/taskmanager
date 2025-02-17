// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSquareCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './App.css';

const URL = "http://localhost:8080/tasks";

function App() {

  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

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
      if (await axios.post(URL, {title: newTitle, description: newDescription},
        { headers: { "Content-Type": "application/json" } }))

        fetchTasks();
        setNewTitle("");
        setNewDescription("");

      return alert("Task added successfully");

    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      if (await axios.delete(`${URL}/${id}`))
        setTasks(tasks.filter((task) => task.id !== id));
      
      return alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const updateTask = async (id) => {
    try{
      if (await axios.put(`${URL}/${id}`, {title: newTitle, description: newDescription},
        { headers: { "Content-Type": "application/json" } }))
          return alert("Task updated successfully");
      
        setNewTitle("");
        setNewDescription("");
        fetchTasks();

    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const completeTask = async (id) => {
    try{
      if (await axios.put(`${URL}/complete/${id}`))
        fetchTasks();

      return alert("Task completed successfully");
  
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
                    <span className="task-action edit" title="edit" onClick={() => {updateTask(task.id)}}>
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
      
    </div>

  );

};
export default App;