import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { Category, fetchTasks } from '../api/fetchTasks';

export enum FetchState {
  LOADING = 'pending',
  SUCCESS = 'done',
  ERROR = 'rejected',
}
class TaskStore {
  categories: Category[] = [];
  fetchState: FetchState = FetchState.LOADING;
  filteredTasks: Category[] = [];
  activeCategory: string = '';
  constructor() {
    makeObservable(this, {
      categories: observable,
      filteredTasks: observable,
      activeCategory: observable,
      allTasks: computed,
      fetchState: observable,
      fetchTasks: action,
      deleteTask: action,
      addCategory: action,
    });
  }

  fetchTasks = async () => {
    try {
      const res = await fetchTasks();
      runInAction(() => {
        this.categories = res;
        this.fetchState = FetchState.SUCCESS;
      });
    } catch (e) {
      runInAction(() => {
        this.fetchState = FetchState.ERROR;
      });
    }
  };
  setActiveCategory = (title: string) => {
    this.activeCategory = title;
  };
  get allTasks() {
    if (this.filteredTasks.length === 0) {
      this.filteredTasks = this.categories;
    }
    return this.filteredTasks.flatMap((category: Category) => category.tasks);
  }
  deleteTask = (alias: string) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      this.categories = this.filteredTasks.map((category) => {
        return {
          ...category,
          tasks: category.tasks.filter((task) => task.alias !== alias),
        };
      });
      this.filteredTasks = this.categories;
    }
  };
  addTask = (title: string, alias: string) => {
    const category = this.filteredTasks.find((category) => category.title === title);
    const taskExists = category?.tasks.some((task) => task.alias === alias);
    if (taskExists) return alert('Такая задача уже есть, введите другое имя');
    if (category) {
      category.tasks.push({
        alias: alias,
        done: false,
      });
    }
  };
  addCategory = (title: string) => {
    this.filteredTasks.push({
      title: title,
      tasks: [],
    });
  };
  filterByCategory = (title: string) => {
    this.filteredTasks = this.categories.filter((category) => category.title === title);
    console.log(this.filteredTasks);
  };
  resetFilter = () => {
    this.filteredTasks = this.categories;
    console.log(this.filteredTasks);
  };
}
export default new TaskStore();
