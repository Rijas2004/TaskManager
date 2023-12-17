import React from "react";
import { motion } from "framer-motion";
import classes from "./TaskListItem.module.css";

const TaskListItem = ({
  task,
  index,
  formatDate,
  selectedTaskIndex,
  onDeleteTask,
  onViewDetails,
  onMarkAsCompleted,
  onMarkAsFailed,
}) => {
  const handleViewDetails = () => {
    onViewDetails(index);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3>{task.taskName}</h3>
      <p className={classes.dueDate}>
        Complete until {formatDate(task.dueDate)}
      </p>
      <div className={classes.statusBtn}>
        <button onClick={() => onDeleteTask(index)}>Delete</button>
        <button
          onClick={() => onMarkAsFailed(index)}
          className={classes.btnNegative}
        >
          Mark as failed
        </button>
        <button onClick={() => onMarkAsCompleted(index)}>
          Mark as completed
        </button>
      </div>
      <p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleViewDetails}
        >
          View Details{"  "}
          <motion.span>{selectedTaskIndex === index ? "▼" : "▲"} </motion.span>
        </motion.button>
      </p>
      {selectedTaskIndex === index && (
        <div>
          <p>{task.taskDetail}</p>
        </div>
      )}
    </motion.li>
  );
};

export default TaskListItem;
