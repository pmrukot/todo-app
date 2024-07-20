import React, { useState } from "react";

import * as S from "./Todo.styles";
import { SortButton } from "./SortButton";
import { Priority } from "../types";
import { parseDate, tasksComparator } from "./Todo.utils";
import { useQueryGetTodo } from "./Todo.hooks";

const Todo: React.FC = () => {
  const [titleSearch, setTitleSearch] = useState("");
  const [priority, setPriority] = useState<Priority>("any");
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");

  const [sortPriority, setSortPriority] = useState(false);
  const [sortDate, setSortDate] = useState(false);

  const { data: tasks = [], refetch: refetchTasks } = useQueryGetTodo();

  // TODO: add option to clear all filters done
  // TODO: add sorting
  // TODO: improve styling: add column headers, make priority and date columns smaller (1:2 proportion)
  // TODO: add spinner when data is loading (React.Suspense)
  // TODO: add custom hook for input element handling (should accept initial input value AND return current input value and onChangeFunction to pass to html element)
  // TODO: add debounce/throttling (optional)

  const clearAllFilters = async () => {
    setTitleSearch("");
    setPriority("any");
    setDateFrom("2024-01-01");
    setDateTo("2024-12-31");
    setSortPriority(false);
    setSortDate(false);
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(titleSearch))
    .filter((task) => parseDate(task.due_date) > parseDate(dateFrom))
    .filter((task) => parseDate(task.due_date) < parseDate(dateTo))
    .filter((task) => {
      return priority === "any" || task.priority === priority;
    })
    .sort(tasksComparator("date", sortDate ? "asc" : "desc"))
    .sort(tasksComparator("priority", sortPriority ? "asc" : "desc"));

  return (
    <S.TodoList>
      <S.TableHeader>
        <h4>Lista Zadań</h4>
        <button onClick={() => refetchTasks()}>Pobierz listę zadań</button>
      </S.TableHeader>
      <S.Table>
        <S.TableRow>
          <S.TableElement flexGrow={2}>
            <S.TableFilters>
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
            </S.TableFilters>
          </S.TableElement>
          <S.TableElement flexGrow={2}>
            <S.TableFilters>
              <label htmlFor="dateFrom">Date from</label>
              <input
                id="dateFrom"
                type="date"
                name="dateFrom"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <label htmlFor="dateTo">Date to</label>
              <input
                id="dateTo"
                type="date"
                name="dateTo"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </S.TableFilters>
          </S.TableElement>
          <SortButton sortFlag={sortPriority} setSortFlag={setSortPriority} />
          <SortButton sortFlag={sortDate} setSortFlag={setSortDate} />
        </S.TableRow>
      </S.Table>
      <S.Table>
        {filteredTasks.map((task, index) => (
          <S.TableRow key={index}>
            <S.TableElement flexGrow={2}>{task.title}</S.TableElement>
            <S.TableElement flexGrow={2}>{task.description}</S.TableElement>
            <S.TableElement flexGrow={1}>
              Priorytet: {task.priority}
            </S.TableElement>
            <S.TableElement flexGrow={1}>
              Termin: {parseDate(task.due_date).toLocaleString()}
            </S.TableElement>
          </S.TableRow>
        ))}
      </S.Table>
    </S.TodoList>
  );
};

export { Todo as FetchDataFromJson };
