import React from "react";
import FormInput from "./components/FormInput";
import TaskList from "./components/TaskList";
import "./index.css";
import "./App.css";
import Header from "./components/Header";
import { TodoContextProvider } from "./TodoContext";

const App = () => {
  return (
    <TodoContextProvider>
      <div className="container">
        <Header />
        <FormInput />
        <TaskList />
      </div>
    </TodoContextProvider>
  );
};

export default App;
