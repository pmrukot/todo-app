import styled from "styled-components";
import tasksJson from "../tasks.json";
import React, { useState } from "react";

interface Task {
  title: string;
  description: string;
  priority: string;
  due_date: string;
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const TableElement = styled.div<{ flexGrow: number }>`
  width: 100%;
`;

const TableFilters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100vw;
  margin: 16px;
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const FetchDataFromJson: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [priority, setPriority] = useState("any");

  const fetchData = async () => {
    try {
      const response = async () => sleep(3000).then(() => tasksJson);
      const data = await response();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // TODO: add option to clear all filters
  // TODO: add sorting
  // TODO: improve styling: add column headers, make priority and date columns smaller (1:2 proportion)
  // TODO: add spinner when data is loading (React.Suspense)
  // TODO: add custom hook for input element handling (should accept initial input value AND return current input value and onChangeFunction to pass to html element)
  // TODO: add debounce/throttling (optional)

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(titleSearch))
    .filter((task) => {
      return priority === "any" || task.priority === priority;
    });

  return (
    <TodoList>
      <TableHeader>
        <h4>Lista Zadań</h4>
        <button onClick={fetchData}>Pobierz listę zadań</button>
      </TableHeader>
      <TableFilters>
        <input
          id="title"
          type="text"
          name="title"
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
          required
        />
        <label htmlFor="taskPriority">Priority </label>
        <select
          id="taskPriority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="any">any</option>
          <option value="low">low</option>
          <option value="mid">mid</option>
          <option value="high">high</option>
        </select>
      </TableFilters>

      <Table>
        {filteredTasks.map((task, index) => (
          <TableRow key={index}>
            <TableElement flexGrow={2}>{task.title}</TableElement>
            <TableElement flexGrow={2}>{task.description}</TableElement>
            <TableElement flexGrow={1}>Priorytet: {task.priority}</TableElement>
            <TableElement flexGrow={1}>Termin: {task.due_date}</TableElement>
          </TableRow>
        ))}
      </Table>
    </TodoList>
  );
};

export { FetchDataFromJson };
