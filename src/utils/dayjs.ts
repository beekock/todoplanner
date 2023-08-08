import dayjs from 'dayjs';
import ruLocale from 'dayjs/locale/ru';
import weekday from 'dayjs/plugin/weekday';

import { DAY_FORMAT } from '../@types/calendarTypes';
import Month from '../components/Month';
import TaskStore from '../store/TaskStore';

dayjs.extend(weekday);

export const getMonthMatrix = (month = dayjs().month()) => {
  const year = dayjs().locale(ruLocale).year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).locale(ruLocale).weekday();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const monthMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount)).locale(ruLocale);
    });
  });
  return monthMatrix;
};

export const getYear = (monthIndex: number): string => {
  return dayjs(new Date(dayjs().year(), monthIndex))
    .locale(ruLocale)
    .format('MMMM YYYY')
    .replace(/[a-zа-я]+/gi, (match) => match[0].toUpperCase() + match.substr(1));
};

export const getMonthIndexFromDate = (date: string) => {
  return dayjs(date).month();
};

export const getCurrentDay = () => {
  return dayjs().locale(ruLocale).format(DAY_FORMAT.YYYY_MM_DD);
};

export const getMonthIndexFromZeroToEleven = (monthIndex: number) => {
  return dayjs().month(monthIndex).month();
};
export const getFormatedDate = (date: string) => {
  let day = date.slice(-2, date.length);
  if (+day < 10) day = day.slice(1, 2);
  let month = date.slice(-5, -3);
  let year = date.slice(0, 4);

  return { day, month, year };
};
export const getMonthsArray = () => {
  const monthsArray = [];
  for (let i = 1; i <= 12; i++) {
    monthsArray.push(i);
  }
  return monthsArray;
};
export const getYearsArray = () => {
  const yearsArray = [];
  for (let i = 2023; i <= 2040; i++) {
    yearsArray.push(i);
  }
  return yearsArray;
};
export const convertDateToNumber = (date: string) => {
  const splitDate = date.split('-');
  const [year, month, day] = splitDate;
  return new Date().setFullYear(+year, +month, +day);
};
export const getMonthRuTitle = (index: number) => {
  const month = dayjs(new Date(dayjs().year(), index)).locale(ruLocale).format('MMMM');
  if (index === 2 || index === 7) {
    return month + 'a';
  } else {
    return month.slice(0, -1) + 'я';
  }
};
