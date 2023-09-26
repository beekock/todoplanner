import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { fetchTasks, Task } from '../api/fetchTasks';
import { fetchCategories } from '../api/fetchCategories';
import { dayComparsion } from '../utils/dateHelper';

class TaskStore {
  @observable tasks: Task[] = [];
  @observable categories: string[] = [];
  @observable initialTasks: Task[] = [];
  @observable activeCategory: string = '';
  @observable fetchStatus: string = 'pending';
  constructor() {
    makeObservable(this);
  }

  private generateId = () => {
    return Math.round(Math.random() * 10e2);
  };
  private syncWithLS = (key: string, data: Task[] | string[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  @action getData = async () => {
    localStorage.clear();
    this.fetchStatus = 'pending';
    const tasks = localStorage.getItem('tasks');
    const categories = localStorage.getItem('categories');
    if (tasks && categories && tasks.length > 0) {
      this.tasks = JSON.parse(tasks);
      this.categories = JSON.parse(categories);
    } else {
      try {
        const tasks = await fetchTasks();
        const categories = await fetchCategories();
        runInAction(() => {
          this.tasks = tasks.map((task) => {
            return {
              ...task,
              date: new Date(),
            };
          });
          this.categories = categories;
          this.syncWithLS('categories', this.categories);
          this.syncWithLS('tasks', this.tasks);
        });
      } catch (e) {
        runInAction(() => {
          this.fetchStatus = 'error';
        });
      }
    }
  };
  @computed get filteredTasks() {
    return this.activeCategory
      ? this.tasks.filter((task) => task.categories.includes(this.activeCategory) && !task.isDone)
      : this.tasks.filter((task) => !task.isDone);
  }
  @computed get doneTasks() {
    return this.activeCategory
      ? this.tasks.filter((task) => task.categories?.includes(this.activeCategory) && task.isDone)
      : this.tasks.filter((task) => task.isDone);
  }
  @action setActiveCategory = (category: string) => {
    this.activeCategory = category;
    this.syncWithLS('categories', this.categories);
  };
  @action deleteTask = (task: Task) => {
    this.tasks = this.tasks.filter((item) => item !== task);
    this.setActiveCategory('');
    this.syncWithLS('tasks', this.tasks);
  };
  @action addTask = ({
    alias,
    categories,
    day,
    year,
    month,
  }: {
    alias: string;
    categories: string[];
    day: number;
    year: number;
    month: number;
  }) => {
    this.tasks = [
      ...this.tasks,
      {
        id: this.generateId(),
        alias,
        isDone: false,
        categories,
        description: '',
        date: new Date(year, month - 1, day),
      },
    ];
    this.syncWithLS('tasks', this.tasks);
  };
  @action addCategory = (category: string) => {
    this.categories.includes(category)
      ? alert('Такая категория уже есть')
      : (this.categories = [...this.categories, category]);
    this.syncWithLS('categories', this.categories);
  };
  @action deleteCategory = (title: string) => {
    this.tasks = this.tasks.map((task) => {
      task.categories = task.categories?.filter((category) => category !== title);
      return task;
    });
    this.syncWithLS('tasks', this.tasks);
    this.categories = this.categories.filter((category) => category !== title);

    this.syncWithLS('categories', this.categories);
  };
  @action toggleIsDone = (id: number) => {
    const index = this.tasks.findIndex((target) => target.id === id);
    if (index !== -1) {
      this.tasks[index].isDone = !this.tasks[index].isDone;
    }
    this.syncWithLS('tasks', this.tasks);
  };
  @action updateTask = ({ id, alias, categories, description, date }: Task) => {
    this.tasks = this.tasks.filter((target) => target.id !== id);
    if (!Array.isArray(categories)) categories = [categories];
    this.tasks = [...this.tasks, { id, alias, categories, description, date }];
    this.syncWithLS('tasks', this.tasks);
  };
  @action getTasksAtDay = (day: Date) => {
    return this.tasks.filter((task) => dayComparsion(task.date, day));
  };
}
export default new TaskStore();
