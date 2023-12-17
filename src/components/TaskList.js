import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import classes from "./TaskList.module.css";
import TaskTabs from "./TaskTabs";
import TaskListItem from "./TaskListItem";
import TaskStatusModal from "../layout/TaskStatusModal";
import { TasksContext } from "../store/task-context";

const TaskList = () => {
  const { tasks, deleteTask, updateTaskStatus } = useContext(TasksContext);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [modalStatus, setModalStatus] = useState(null);
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);

  useEffect(() => {
    // Fetch tasks from context or local storage
    // const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // setTasks(storedTasks);
  }, []);

  useEffect(() => {
    filterTasks(activeTab, tasks);
  }, [activeTab, tasks]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteTask = (index) => {
    setDeleteTaskIndex(index);
    setModalStatus("deleted");
  };

  const handleViewDetails = (index) => {
    setSelectedTaskIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleMarkAsCompleted = (index) => {
    updateTaskStatus(tasks[index].id, "completed");
    setModalStatus("completed");
  };

  const handleMarkAsFailed = (index) => {
    updateTaskStatus(tasks[index].id, "failed");
    setModalStatus("failed");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCloseModal = () => {
    setModalStatus(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTaskIndex !== null) {
      deleteTask(tasks[deleteTaskIndex].id);
      setDeleteTaskIndex(null);
      setModalStatus(null);
    }
  };

  const filterTasks = (status, tasksToFilter) => {
    if (status === "all") {
      setFilteredTasks(tasksToFilter);
    } else {
      const filtered = tasksToFilter.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <h2>Your Task List</h2>
      <div className={classes.taskCard}>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <>
            <ul className={classes.taskList}>
              <TaskTabs activeTab={activeTab} onTabChange={handleTabChange} />
              {filteredTasks.length === 0 ? (
                <p>No challenges found.</p>
              ) : (
                filteredTasks.map((task, index) => (
                  <TaskListItem
                    key={index}
                    task={task}
                    index={index}
                    formatDate={formatDate}
                    selectedTaskIndex={selectedTaskIndex}
                    onDeleteTask={handleDeleteTask}
                    onViewDetails={handleViewDetails}
                    onMarkAsCompleted={handleMarkAsCompleted}
                    onMarkAsFailed={handleMarkAsFailed}
                  />
                ))
              )}
            </ul>
          </>
        )}
        {modalStatus && (
          <TaskStatusModal
            status={modalStatus}
            onClose={handleCloseModal}
            onConfirmDelete={handleConfirmDelete}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;
