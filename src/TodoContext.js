import axios from "axios";
import { createContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [fetchingTodo, setFetchingTodo] = useState([]);
  const [todosEdit, setTodosEdit] = useState({
    item: {},
    edit: false,
  });

  // data fetching from Api's-----

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => setFetchingTodo(response.data))
      .catch((error) => console.error(error));
  });

  // Add todo Task ------

  const addTaskHandler = (task) => {
    axios
      .post("http://localhost:3001/tasks", task)
      .then(() => setFetchingTodo([task, ...fetchingTodo]))
      .catch((error) => console.error(error));
  };

  // Delete todo Task -----

  const taskDeleteHandler = (id) => {
    const url = `http://localhost:3001/tasks/${id}`;
    axios
      .delete(url)
      .then(() =>
        setFetchingTodo(fetchingTodo.filter((taskItem) => taskItem.id !== id))
      )
      .catch((error) => console.error(error));
  };

  // update Todos Item ------
  const updateTodos = (todoid, updatedTodo) => {
    console.log(updatedTodo);
    const url = `http://localhost:3001/tasks/${todoid}`;
    axios
      .put(url, updatedTodo)
      .then(() => {
        setFetchingTodo(
          fetchingTodo.map((item) =>
            item.id === todoid ? { item, ...updatedTodo } : item
          )
        );
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  //   set Item to be Updated -----
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
