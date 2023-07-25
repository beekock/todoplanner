import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { fetchTasks, Task } from '../api/fetchTasks';
import { fetchCategories } from '../api/fetchCategories';

export enum FetchState {
  LOADING = 'pending',
  SUCCESS = 'done',
  ERROR = 'rejected',
}
class TaskStore {
  @observable tasks: Task[] = [];
  @observable categories: string[] = [];
  @observable initialTasks: Task[] = [];
  @observable activeCategory: string = '';
  constructor() {
    makeObservable(this);
  }

  private generateId = () => {
    return Math.round(Math.random() * 10e2);
  };
  @action getData = async () => {
    try {
      const tasks = await fetchTasks();
      const categories = await fetchCategories();
      runInAction(() => {
        this.tasks = tasks;
        this.categories = categories;
      });
    } catch (e) {}
  };
  @computed get filteredTasks() {
    return this.activeCategory
      ? this.tasks.filter((task) => task.categories.includes(this.activeCategory))
      : this.tasks;
  }
  @action setActiveCategory = (category: string) => {
    this.activeCategory = category;
  };
  @action deleteTask = (task: Task) => {
    this.tasks = this.tasks.filter((item) => item !== task);
  };
  @action addTask = ({ alias, categories }: { alias: string; categories: string[] }) => {
    this.tasks = [
      ...this.tasks,
      {
        id: this.generateId(),
        alias: alias,
        isDone: false,
        categories: categories,
        description: '',
      },
    ];
  };
  @action addCategory = (category: string) => {
    this.categories.includes(category)
      ? alert('Такая категория уже есть')
      : (this.categories = [...this.categories, category]);
  };
  @action updateTask = (id: number, { alias, categories, description }: Task) => {
    const index = this.tasks.findIndex((target) => target.id === id);
    if (index !== -1) {
      this.tasks[index].alias = alias;
      this.tasks[index].categories = categories;
      this.tasks[index].description = description;
    }
    console.log('success', index);
  };
}
export default new TaskStore();
