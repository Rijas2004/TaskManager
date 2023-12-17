import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import classes from "./TaskaddForm.module.css";
import Modal from "../layout/Modal";
import { TasksContext } from "../store/task-context";

const TaskaddForm = () => {
  const { addTask } = useContext(TasksContext);

  const [taskName, setTaskName] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDetailChange = (event) => {
    setTaskDetail(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskName.trim() || !dueDate.trim() || !taskDetail.trim()) {
      setValidationError("Please fill out all fields!");
      return;
    }

    const newTask = {
      taskName,
      taskDetail,
      dueDate,
    };

    addTask(newTask);

    setValidationError("");
    setTaskName("");
    setTaskDetail("");
    setDueDate("");
    setIsModalOpen(true);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={classes.formContainer}
      >
        <h2>Create your task here</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="taskname">Task Name:</label>
          <input
            type="text"
            id="taskname"
            value={taskName}
            onChange={handleTaskNameChange}
          />

          <label htmlFor="taskdetail">Task Detail:</label>
          <textarea
            type="text"
            id="taskdetail"
            value={taskDetail}
            onChange={handleTaskDetailChange}
          />

          <label htmlFor="duedate">Due Date:</label>
          <input
            type="date"
            id="duedate"
            value={dueDate}
            onChange={handleDueDateChange}
            min={currentDate}
          />

          <button type="submit">Submit</button>
        </form>
        {validationError && <p className={classes.error}>{validationError}</p>}
      </motion.div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className={classes.modal}>
            <p>Task added succesfully!</p>
            <button className={classes.btn} onClick={() => navigate("/")}>
              Go to Task List
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TaskaddForm;
