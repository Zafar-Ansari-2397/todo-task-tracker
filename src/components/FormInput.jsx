import React, { useState, useContext, useEffect } from "react";
import TodoContext from "../TodoContext";

const FormInput = () => {
  const { addTaskHandler, todosEdit, updateTodos } = useContext(TodoContext);
  const [inputText, setInputText] = useState("");

  const onChangeHandler = (e) => {
    setInputText(e.target.value);
    console.log(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!inputText) return;
    const newTaskAdd = {
      id: Date.now(),
      title: inputText,
      completed: false,
    };
    addTaskHandler(newTaskAdd);

    if (todosEdit.edit === true) {
      updateTodos(todosEdit.item.id, newTaskAdd);
      setInputText("");
    } else {
      setInputText("");
    }
  };

  useEffect(() => {
    if (todosEdit.edit === true) {
      setInputText(todosEdit.item.title);
    }
  }, [todosEdit]);

  return (
    <>
      <form className="flex w-[400px] mx-auto mt-10">
        <input
          id="outlined-basic"
          placeholder="Write Here Your Task..."
          value={inputText}
          onChange={onChangeHandler}
          className="bg-white text-center border border-gray-300 rounded-lg p-2 w-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-customPurple focus:border-customPurple text-content-center"
        />

        <button
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded w-[134px]"
          onClick={onSubmitHandler}
        >
          Add Task
        </button>
      </form>
    </>
  );
};

export default FormInput;
