export interface Task {
  title: string;
  description: string;
  priority: Priority;
  due_date: string;
}

export type Priority = "low" | "mid" | "high" | "any";
