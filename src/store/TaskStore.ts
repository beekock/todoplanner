import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { fetchTasks, Task } from '../api/fetchTasks';
import { fetchCategories } from '../api/fetchCategories';
import { arrayBuffer } from 'stream/consumers';

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
    console.log(this.tasks);
  };
  @action getData = async () => {
    this.fetchStatus = 'pending';
    const tasks = localStorage.getItem('tasks');
    const categories = localStorage.getItem('categories');
    if (tasks && categories) {
      this.tasks = JSON.parse(tasks);
      this.categories = JSON.parse(categories);
    } else {
      try {
        const tasks = await fetchTasks();
        const categories = await fetchCategories();
        runInAction(() => {
          this.tasks = tasks;
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
    this.syncWithLS('tasks', this.tasks);
  };
  @action addTask = ({ alias, categories }: { alias: string; categories: string[] }) => {
    this.tasks = [
      ...this.tasks,
      {
        id: this.generateId(),
        alias,
        isDone: false,
        categories,
        description: '',
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
  @action updateTask = (id: number, { alias, categories, description }: Task) => {
    const index = this.tasks.findIndex((target) => target.id === id);
    if (Array.isArray(categories)) categories = [...categories];
    if (index !== -1) {
      this.tasks[index].alias = alias;
      this.tasks[index].categories = categories;
      this.tasks[index].description = description;
    }
    this.syncWithLS('tasks', this.tasks);
  };
}
export default new TaskStore();
