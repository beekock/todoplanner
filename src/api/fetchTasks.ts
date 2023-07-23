import axios from 'axios';

export type Category = {
  title: string;
  tasks: Task[];
};
export type Task = {
  alias: string;
  done: boolean;
};
export const fetchTasks = async () => {
  return (await axios.get<Category[]>('https://6389fa094eccb986e89fec00.mockapi.io/tasks')).data;
};
