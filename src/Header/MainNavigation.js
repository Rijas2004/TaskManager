import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <h1>Task Manager</h1>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              TaskList
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks/create"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add Task
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
