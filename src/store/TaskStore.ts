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
      ? this.tasks.filter((task) => task.category.includes(this.activeCategory))
      : this.tasks;
  }
  @action setActiveCategory = (category: string) => {
    this.activeCategory = category;
  };
  @action deleteTask = (task: Task) => {
    this.tasks = this.tasks.filter((item) => item !== task);
  };
  @action addTask = (alias: string, category: string[]) => {
    this.tasks = [...this.tasks, { alias, isDone: false, category: category }];
  };
  @action addCategory = (category: string) => {
    this.categories.includes(category)
      ? alert('Такая категория уже есть')
      : (this.categories = [...this.categories, category]);
  };
}
export default new TaskStore();
