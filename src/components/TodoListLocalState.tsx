import React, { useState } from "react";

export const TodoListLocalState = () => {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodoItem = () => {
    setTodoList(todoList.concat(["todo"]));
  };

  return (
    <div>
      <h3>Todo list local state</h3>
      <button data-test-button="add-todo" onClick={addTodoItem}>
        Click to add todo
      </button>
      <ul>
        {todoList
          .map((todoItem, index) => `${todoItem}-${index + 1}`)
          .map((item) => (
            <li data-test-li="todo-item" key={item}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};
