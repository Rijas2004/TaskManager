import React, { createContext, useState, useEffect } from "react";

export const TasksContext = createContext({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  updateTaskStatus: () => {},
});

export default function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    setTasks((prevTasks) => [
      { ...task, id: Math.random().toString(), status: "all" },
      ...prevTasks,
    ]);
    updateLocalStorage([...tasks, task]);
  }

  function deleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    updateLocalStorage(tasks.filter((task) => task.id !== taskId));
  }

  function updateTaskStatus(taskId, newStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
    updateLocalStorage(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  function updateLocalStorage(updatedTasks) {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const tasksContext = {
    tasks,
    addTask,
    deleteTask,
    updateTaskStatus,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
}
