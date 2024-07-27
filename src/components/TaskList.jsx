import React, { useContext } from "react";

import TaskItem from "./TaskItem";
import TodoContext from "../TodoContext";

const TaskList = () => {
  const { fetchingTodo } = useContext(TodoContext);
  return (
    <div className="text-center ">
      {fetchingTodo.map((task) => {
        return <TaskItem key={task.id} task={task} />;
      })}
    </div>
  );
};

export default TaskList;
