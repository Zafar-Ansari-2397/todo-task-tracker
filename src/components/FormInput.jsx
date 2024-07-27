import React, { useState, useContext, useEffect } from "react";
import TodoContext from "../TodoContext";
import { v4 as uuidv4 } from "uuid";

const FormInput = () => {
  const { addTaskHandler, todosEdit, updateTodos } = useContext(TodoContext);
  const [inputText, setInputText] = useState("");

  const onChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!inputText) return;
    const newTaskAdd = {
      id: uuidv4(),
      title: inputText,
      completed: false,
    };

    if (todosEdit.edit === true) {
      updateTodos(todosEdit.item.id, newTaskAdd);
      setInputText("");
    } else {
      addTaskHandler(newTaskAdd);
    }
    setInputText("");
  };

  useEffect(() => {
    if (todosEdit.edit === true) {
      setInputText(todosEdit.item.title);
    }
  }, [todosEdit]);

  return (
    <>
      <form className="flex flex-col sm:flex-row w-full max-w-lg mx-auto mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          id="outlined-basic"
          placeholder="Write Here Your Task..."
          value={inputText}
          onChange={onChangeHandler}
          className="bg-white text-center border border-gray-300 rounded-lg p-2 w-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-customPurple focus:border-customPurple"
        />

        <button
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto"
          onClick={onSubmitHandler}
        >
          Add Task
        </button>
      </form>
    </>
  );
};

export default FormInput;
