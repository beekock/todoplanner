import { action, makeObservable, observable } from 'mobx';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}
class UiStore {
  @observable isMobile: boolean = window.matchMedia('(max-width: 767px)').matches;
  @observable theme: Theme = Theme.LIGHT;
  constructor() {
    makeObservable(this);
  }

  @action setIsMobile = (value: boolean) => {
    this.isMobile = value;
  };
  @action toggleTheme = () => {
    this.theme = this.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
  };
}

export default new UiStore();
