export type Task = {
  id: number;
  alias: string;
  isDone?: boolean;
  categories: string[];
  description: string;
};
export const fetchTasks = async () => {
  const response = await fetch('https://6389fa094eccb986e89fec00.mockapi.io/tasks');
  const tasks: Task[] = await response.json();
  return tasks;
};
