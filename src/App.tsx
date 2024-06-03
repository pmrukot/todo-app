import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as S from "./App.styles";
import { TodoListLocalState } from "./components/TodoListLocalState";
import { TodoListDataFetching } from "./components/TodoListDataFetching";
import { FetchDataFromJson }  from "./components/TodoListDataFetchingFromJson"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <S.AppContainer>
      <S.Header>Todo App</S.Header>
      <S.Layout>
        <TodoListLocalState />
        <TodoListDataFetching />
          <S.Table>
            <S.Td>
              <S.Th>
              <FetchDataFromJson />
              </S.Th>
            </S.Td>
          </S.Table>
      </S.Layout>
    </S.AppContainer>
  </QueryClientProvider>
);

export default App;
