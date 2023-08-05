import dayjs, { Dayjs } from 'dayjs';
import { action, makeObservable, observable } from 'mobx';

class CalendarStore {
  @observable monthIndex: number = dayjs().month();
  @observable todayDay: Dayjs = dayjs();
  @observable selectedDay: Dayjs = dayjs();
  @observable isCardOpen: boolean = false;
  constructor() {
    makeObservable(this);
  }
  @action incMonthIndex = () => {
    this.monthIndex = this.monthIndex + 1;
  };
  @action decMonthIndex = () => {
    this.monthIndex = --this.monthIndex;
  };
  @action resetMonthIndex = () => {
    this.monthIndex = dayjs().month();
  };
  @action setToday = (day: Dayjs) => {
    this.todayDay = day;
  };
  @action toggleCardOpen = () => {
    this.isCardOpen = !this.isCardOpen;
  };
  @action selectDay = (day: Dayjs) => {
    this.selectedDay = day;
  };
}
export default new CalendarStore();
