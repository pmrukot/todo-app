import { Priority, Task } from "../types";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const priorityMap: Record<Priority, number> = {
  any: 0,
  low: 1,
  mid: 2,
  high: 3,
};

export const tasksComparator =
  (column: string, order: string) => (a: Task, b: Task) => {
    if (column === "priority" && order === "asc") {
      return priorityMap[a.priority] - priorityMap[b.priority];
    } else if (column === "priority" && order === "desc") {
      return priorityMap[b.priority] - priorityMap[a.priority];
    } else if (column === "date" && order === "asc") {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    } else if (column === "date" && order === "desc") {
      return new Date(b.due_date).getTime() - new Date(a.due_date).getTime();
    }
    return 0;
  };
