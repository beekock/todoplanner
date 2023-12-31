import { action, computed, makeObservable, observable } from 'mobx';

import { createDate } from '../utils/dateHelper';
import TaskStore from './TaskStore';

class CalendarStore {
  @observable monthIndex: number = this.Date.getMonth();
  @observable year: number = this.Date.getFullYear();
  @observable todayDay: Date = this.Date;
  @observable selectedDay: Date = this.todayDay;
  @observable onChangeMonthIndex: number = this.Date.getMonth();
  constructor() {
    makeObservable(this);
  }
  @computed get Date() {
    const d = new Date();
    return d;
  }
  @computed get tasksAtDay() {
    const { tasks } = TaskStore;
    return tasks.filter((task) => task.date === this.selectedDay);
  }
  @computed get monthName() {
    const d = new Date(this.year, this.monthIndex);

    return d.toLocaleString('ru', { month: 'long', year: 'numeric' });
  }
  @computed get onChangeMonthDays() {
    const getMonthNumberOfDays = () =>
      new Date(this.year, this.onChangeMonthIndex + 1, 0).getDate();
    const getDay = (dayNumber: number) => {
      return createDate({ date: new Date(this.year, this.onChangeMonthIndex, dayNumber) });
    };
    const days = [];
    for (let i = 0; i <= getMonthNumberOfDays() - 1; i++) {
      days[i] = getDay(i + 1);
    }
    return days;
  }
  @computed get months() {
    const months: number[] = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    return months;
  }
  @computed get yearInterval() {
    const years: number[] = [];
    for (let i = 0; i <= 10; i++) {
      years.push(this.year + i);
    }
    return years;
  }
  @computed get monthMatrix() {
    const firstDayOfTheMonth = (new Date(this.year, this.monthIndex, 1).getDay() + 6) % 7;
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const monthMatrix = new Array(6).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return new Date(this.year, this.monthIndex, currentMonthCount);
      });
    });
    return monthMatrix;
  }
  @action setMonthIndex = (index: number) => {
    this.monthIndex = index;
  };
  @action setOnChangeMonthIndex = (index: number) => {
    this.onChangeMonthIndex = index;
  };
  @action incMonthIndex = () => {
    this.monthIndex = ++this.monthIndex;
    if (this.monthIndex > 11) {
      this.monthIndex = 0;
      this.year = ++this.year;
    }
  };
  @action decMonthIndex = () => {
    this.monthIndex = --this.monthIndex;
    if (this.monthIndex < 0) {
      this.monthIndex = 11;
      this.year = --this.year;
    }
  };
  @action resetMonthIndex = () => {
    this.monthIndex = new Date().getMonth();
    this.year = new Date().getFullYear();
  };
  @action selectDay = (day: Date) => {
    this.selectedDay = day;
  };
}
export default new CalendarStore();
