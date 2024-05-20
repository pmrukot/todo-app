import React, { useState } from "react";

type Priority = "low" | "mid" | "high";

type Task = {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
};

type TodoListProps = {
  todoList: Task[];
};

const TodoList: React.FC<TodoListProps> = ({ todoList }) => (
  <div className="task-list">
    <h2>Lista zadań</h2>
    <ul>
      {todoList.map((task, index) => (
        <li key={index}>
          <div className="task-title">Title: {task.title}</div>
          <div className="task-details">Description: {task.description}</div>
          <div className="task-details">Priority: {task.priority}</div>
          <div className="task-details">Due Date: {task.dueDate}</div>
        </li>
      ))}
    </ul>
  </div>
);

type TodoListFormProps = {
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TodoListForm: React.FC<TodoListFormProps> = ({ setTaskList }) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    setTaskList((prevTaskList) => [...prevTaskList, task]);
    setTask({ title: "", description: "", priority: "low", dueDate: "" });
    e.preventDefault();
  };

  return (
    <form id="toDo" onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      <div>
        <label>Title </label>
        <input
          id="taskTitle"
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description </label>
        <textarea
          id="taskDescription"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="taskPriority">Priority </label>
        <select
          id="taskPriority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          required
        >
          <option value="low">low</option>
          <option value="mid">mid</option>
          <option value="high">high</option>
        </select>
      </div>
      <div>
        <label>Due Date </label>
        <input
          type="date"
          id="taskDueDate"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export const TodoListLocalState = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  return (
    <div>
      <TodoList todoList={taskList} />
      <TodoListForm setTaskList={setTaskList} />
    </div>
  );
};

// import React, { useState } from "react";
//
// export const TodoListLocalState = () => {
//   const [todoList, setTodoList] = useState<string[]>([]);
//   const [taskList, setTaskList] = useState<any[]>([]);
//   const [task, setTask] = useState({
//       title: "",
//       description: "",
//       priority: "",
//       dueDate: ""
//     });
//
//     const addTodoItem = () => {
//       setTodoList(todoList.concat(["todo"]));
//
//   };
//
//     const onChange = (e) => { //dlaczego to 'e' nie działa ???
//         const { name, value } = e.target;
//         setTask((prevTask) => ({
//             ...prevTask,
//             [name]: value
//         }));
//     };
//   const addCustomTodo = () => {
//       const [task, setTask] = useState({
//           title: "",
//           description: "",
//           priority: "",
//           dueDate: ""
//       });
//
//
//       const title = document.getElementById("taskTitle");
//       const description = document.getElementById("taskDescription");
//       const priority = document.getElementById("taskPriority");
//       const dueDate = document.getElementById("taskDueDate");
//
//
//       return(
//           <div>
//               <li>
//                   <div className="task-title">Title: {task.title}</div>
//                   <div className="task-details">Description: {task.description}</div>
//                   <div className="task-details">Priority: {task.priority}</div>
//                   <div className="task-details">Due Date: {task.dueDate}</div>
//               </li>
//           </div>
//       )
//   }
//
//   return (
//     <div>
//       <h3>Todo list local state</h3>
//       <button data-test-button="add-todo" onClick={addTodoItem}>
//         Click to add todo
//       </button>
//       <ul>
//         {todoList
//           .map((todoItem, index) => `${todoItem}-${index + 1}`)
//           .map((item) => (
//             <li data-test-li="todo-item" key={item}>
//               {item}
//             </li>
//           ))}
//       </ul>
//         <div className="task-list">
//             <h2>Lista zadań</h2>
//             <div id="taskList"></div>
//         </div>
//         <form id="toDo" onSubmit={addCustomTodo}>
//             <h3>Add Task</h3>
//             <div>
//                 <label>Title </label>
//                 <input id="taskTitle" type="text" name="title" onChange={onChange} required={true}></input>
//             </div>
//             <div>
//                 <label>Description </label>
//                 <textarea id="taskDescription"></textarea>
//             </div>
//             <div>
//                 <label htmlFor="taskPriority">Priority </label>
//                 <select id="taskPriority" name="taskPriority" onChange={onChange} required>
//                     <option value="low">low</option>
//                     <option value="mid">mid</option>
//                     <option value="high">high</option>
//                 </select>
//             </div>
//             <div>
//                 <label>Due Date </label>
//                 <input type="date" id="taskDueDate" name="taskDueDate" onChange={onChange} required></input>
//             </div>
//             <button type="submit">Add Task</button>
//
//         </form>
//
//
//     </div>
//
//
//   );
// };
