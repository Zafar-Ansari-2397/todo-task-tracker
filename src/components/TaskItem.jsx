import React, { useContext } from "react";
import TodoContext from "../TodoContext";

const TaskItem = ({ task }) => {
  const { taskDeleteHandler, editTodos } = useContext(TodoContext);

  return (
    <>
      <div className="container h-auto p-4 w-[60%] m-auto ">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-grow">
            <div
              className="p-4 border rounded-lg bg-gray-100"
              style={{ marginRight: "38px" }}
            >
              {task.title}
            </div>
          </div>
          <button
            className="sm:mt-0 bg-red-500 text-white px-4 py-2 rounded pl-2 mr-2"
            onClick={() => taskDeleteHandler(task.id)}
          >
            Delete
          </button>
          <button
            className="sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded pl-2 "
            onClick={() => editTodos(task)}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
