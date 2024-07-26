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
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setFetchingTodo(data);
      } catch (error) {
        console.log("Error Fetching Data...", Error);
      }
    };
    fetchData();
  }, []);

  // Add todo Task ------

  const addTaskHandler = (task) => {
    setFetchingTodo([task, ...fetchingTodo]);
  };

  // Delete todo Task -----

  const taskDeleteHandler = (id) => {
    console.log(id);
    setFetchingTodo(fetchingTodo.filter((taskItem) => taskItem.id !== id));
  };

  // update Todos Item ------
  const updateTodos = (todoid, updatedTodo) => {
    setFetchingTodo(
      fetchingTodo.map((item) =>
        item.id === todoid ? { ...item, ...updatedTodo } : item
      )
    );
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
