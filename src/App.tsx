import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as S from "./App.styles";
import { FetchDataFromJson } from "./components/Todo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <S.AppContainer>
      <S.Header>Todo App</S.Header>
      <S.Layout>
        <FetchDataFromJson />
      </S.Layout>
    </S.AppContainer>
  </QueryClientProvider>
);

export default App;
