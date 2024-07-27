import React, { useContext } from "react";
import TodoContext from "../TodoContext";

const TaskItem = ({ task }) => {
  const { taskDeleteHandler, editTodos } = useContext(TodoContext);

  return (
    <>
      <div className="container h-auto p-4 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] m-auto">
        <div className="flex items-center justify-between flex-wrap space-y-2 sm:space-y-0">
          <div className="flex-grow">
            <div className="p-4 border rounded-lg bg-gray-100 mr-0 sm:mr-4">
              {task.title}
            </div>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded sm:mr-2"
            onClick={() => taskDeleteHandler(task.id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
