import styled from "styled-components";
import tasksJson from "../tasks.json";
import React, { useState } from "react";

interface Task {
  title: string;
  description: string;
  priority: Priority;
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

const StyledSortButton = styled.button`
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
const priorityMap: Record<Priority, number> = {
  any: 0,
  low: 1,
  mid: 2,
  high: 3
}

const tasksComparator = (column:string, order:string) => (a:Task, b:Task) => {
  // if (column === "title" && order === "asc") {
  //   return a.title.localeCompare(b.title);
  // } else if (column === "title" && order === "desc") {
  //   return b.title.localeCompare(a.title);
  //
  // } else if (column === "description" && order === "asc") {
  //   return a.description.localeCompare(b.description);
  // } else if (column === "description" && order === "desc") {
  //   return b.description.localeCompare(a.description);
  // }
  if (column === "priority" && order === "asc") {
    return priorityMap[a.priority] - priorityMap[b.priority];
  } else if (column === "priority" && order === "desc") {
    return priorityMap[b.priority] - priorityMap[a.priority];
  }
  else if (column === "date" && order === "asc") {
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  } else if (column === "date" && order === "desc") {
    return new Date(b.due_date).getTime() - new Date(a.due_date).getTime();
  }
  return 0;
}
type SortButtonProps = { sortFlag: boolean, setSortFlag:React.Dispatch<React.SetStateAction<boolean>>}

const SortButton: React.FC<SortButtonProps> = ({sortFlag, setSortFlag}) => {
//⬆⬇
  return(
      <StyledSortButton onClick={() => setSortFlag(value => !value)}>Sortuj {sortFlag ? "⬆" : "⬇"}</StyledSortButton>
  );
}

type Priority = 'low'|'mid'|'high'|'any';
const FetchDataFromJson: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [priority, setPriority] = useState<Priority>("any");
  const [sortOption, setSortOption] = useState("titleAsc");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");

  const [sortTitle, setSortTitle] = useState(false);
  const [sortDescription, setSortDescription] = useState(false);
  const [sortPriority, setSortPriority] = useState(false);
  const [sortDate, setSortDate] = useState(false);


  const fetchData = async () => {
    try {
      const response = async () => sleep(3000).then(() => tasksJson);
      const data = await response();
      setTasks(data as Task[]);
      console.log(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // TODO: add option to clear all filters done
  // TODO: add sorting
  // TODO: improve styling: add column headers, make priority and date columns smaller (1:2 proportion)
  // TODO: add spinner when data is loading (React.Suspense)
  // TODO: add custom hook for input element handling (should accept initial input value AND return current input value and onChangeFunction to pass to html element)
  // TODO: add debounce/throttling (optional)

  const clearAllFilters = async () => {
    setTitleSearch("");
    setPriority("any");
    setSortOption("titleAsc");
    setDateFrom("2024-01-01");
    setDateTo("2024-12-31");
    setSortPriority(false);
    setSortDate(false);
  }
  const parseDate = (dateString: String) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };
  const filteredTasks = tasks
      .filter((task) => task.title.toLowerCase().includes(titleSearch))
      .filter((task) => parseDate(task.due_date) > parseDate(dateFrom))
      .filter((task) => parseDate(task.due_date) < parseDate(dateTo))
      .filter((task) => {
        return priority === "any" || task.priority === priority;
      })
      // .sort(tasksComparator("title", sortTitle ? "asc" : "desc"))
      .sort(tasksComparator("date", sortDate ? "asc" : "desc"))
      // .sort(tasksComparator("description", sortDescription ? "asc" : "desc"))
      .sort(tasksComparator("priority", sortPriority ? "asc" : "desc"))


  return (
    <TodoList>
      <TableHeader>
        <h4>Lista Zadań</h4>
        <button onClick={fetchData}>Pobierz listę zadań</button>
      </TableHeader>
      <Table>
        <TableRow>
          <TableElement flexGrow={2}>
            <TableFilters>
              <button onClick={clearAllFilters}>Clear all filters</button>
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
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  required
              >
                <option value="any">any</option>
                <option value="low">low</option>
                <option value="mid">mid</option>
                <option value="high">high</option>
              </select>
              </TableFilters>
          </TableElement>
          <TableElement flexGrow={2}>
            <TableFilters>
              <label htmlFor="dateFrom">Date from</label>
              <input id="dateFrom"
                     type="date"
                     name="dateFrom"
                     value={dateFrom}
                     onChange={e => setDateFrom(e.target.value)}
              />
              <label htmlFor="dateTo">Date to</label>
              <input id="dateTo"
                     type="date"
                     name="dateTo"
                     value={dateTo}
                     onChange={e => setDateTo(e.target.value)}
              />
            </TableFilters>
          </TableElement>
          <SortButton sortFlag={sortPriority} setSortFlag={setSortPriority}/>
          <SortButton sortFlag={sortDate} setSortFlag={setSortDate}/>
        </TableRow>
      </Table>
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
