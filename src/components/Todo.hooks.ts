import { useQuery } from "@tanstack/react-query";
import { Task } from "../types";

const getTodo = async () => {
  const data = await fetch("http://localhost:4000/todo");
  return data.json();
};

export const useQueryGetTodo = () =>
  useQuery<Task[]>({
    queryKey: ["todo"],
    queryFn: getTodo,
  });
