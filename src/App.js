import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskContextProvider from "./store/task-context";
import "./App.css";
import TaskaddForm from "./components/TaskaddForm";
import TaskList from "./components/TaskList";
import RootPage from "./layout/RootPage";

function App() {
  return (
    <Router>
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<RootPage />}>
            <Route index element={<TaskList />} />
            <Route path="tasks/create" element={<TaskaddForm />} />
          </Route>
        </Routes>
      </TaskContextProvider>
    </Router>
  );
}

export default App;
