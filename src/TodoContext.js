import axios from "axios";
import { createContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [fetchingTodo, setFetchingTodo] = useState([]);
  const [todosEdit, setTodosEdit] = useState({
    item: {},
    edit: false,
  });

  // Data fetching from API
  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => setFetchingTodo(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add todo task
  const addTaskHandler = (task) => {
    axios
      .post("http://localhost:3001/tasks", task)
      .then((response) => {
        setFetchingTodo([response.data, ...fetchingTodo]);
      })
      .catch((error) => console.error(error));
  };

  // Delete todo task
  const taskDeleteHandler = (id) => {
    const url = `http://localhost:3001/tasks/${id}`;
    axios
      .delete(url)
      .then(() =>
        setFetchingTodo(fetchingTodo.filter((taskItem) => taskItem.id !== id))
      )
      .catch((error) => console.error(error));
  };

  // Update todos item
  const updateTodos = (todoid, updatedTodo) => {
    const url = `http://localhost:3001/tasks/${todoid}`;
    axios
      .put(url, updatedTodo)
      .then((response) => {
        const updatedTask = response.data;
        setFetchingTodo(
          fetchingTodo.map((item) =>
            item.id === todoid ? { ...item, ...updatedTask } : item
          )
        );
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  // Set item to be updated
  const editTodos = (item) => {
    setTodosEdit({
      item: item,
      edit: true,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        fetchingTodo,
        addTaskHandler,
        taskDeleteHandler,
        editTodos,
        todosEdit,
        updateTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
