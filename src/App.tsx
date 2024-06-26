import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as S from "./App.styles";
import { TodoListLocalState } from "./components/TodoListLocalState";
import { TodoListDataFetching } from "./components/TodoListDataFetching";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <S.AppContainer>
      <S.Header>Todo App</S.Header>
      <S.Layout>
        <TodoListLocalState />
        <TodoListDataFetching />
      </S.Layout>
    </S.AppContainer>
  </QueryClientProvider>
);

export default App;
