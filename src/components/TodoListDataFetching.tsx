import React from "react";
import { useQuery } from "@tanstack/react-query";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const useQueryFetchTodoList = () =>
  useQuery({
    queryKey: ["todoList"],
    queryFn: async () =>
      sleep(3000).then(() => ["laundry", "cleaning", "shopping"]),
    enabled: false,
  });

export const TodoListDataFetching = () => {
  const {
    data: todoList,
    refetch: fetchTodo,
    isLoading,
    isSuccess,
    isError,
  } = useQueryFetchTodoList();

  return (
    <div>
      <h3>Todo list fetch data</h3>
      <button data-test-button="fetch-todo" onClick={() => fetchTodo()}>
        Click to fetch todo list
      </button>
      <ul>
        {isLoading ? <p>Loading...</p> : null}
        {isSuccess ? todoList?.map((todoItem) => <li>{todoItem}</li>) : null}
        {isError ? <p>Error!</p> : null}
      </ul>
    </div>
  );
};
