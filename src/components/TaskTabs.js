import React from "react";
import classes from "./TaskTabs.module.css";

const TaskTabs = ({ onTabChange, activeTab }) => {
  const handleTabClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <div className={classes.menu}>
      <button
        className={activeTab === "all" ? classes.activeTab : ""}
        onClick={() => handleTabClick("all")}
      >
        All
      </button>
      <button
        className={activeTab === "completed" ? classes.activeTab : ""}
        onClick={() => handleTabClick("completed")}
      >
        Completed
      </button>
      <button
        className={activeTab === "failed" ? classes.activeTab : ""}
        onClick={() => handleTabClick("failed")}
      >
        Failed
      </button>
    </div>
  );
};

export default TaskTabs;
