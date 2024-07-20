import styled from "styled-components";

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const TableElement = styled.div<{ flexGrow: number }>`
  width: 100%;
`;

export const TableFilters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100vw;
  margin: 16px;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
`;
