import CalendarStore from '../store/CalendarStore';

interface CreateProps {
  locale?: string;
  date?: Date;
}

export const createDate = (props: CreateProps) => {
  const locale = props?.locale ?? 'default';

  const d = props?.date ?? new Date();
  const dayNumber = d.getDate();
  const weekDay = d.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = d.getDate() + 1;
  const weekDayShort = d.toLocaleDateString(locale, { weekday: 'short' });
  const year = d.getFullYear();
  const yearShort = d.toLocaleDateString(locale, { year: '2-digit' });
  const month = d.toLocaleDateString(locale, { month: 'long' });
  const monthShort = d.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = d.getMonth() + 1;
  const monthIndex = d.getMonth();
  return {
    d,
    dayNumber,
    dayNumberInWeek,
    weekDay,
    weekDayShort,
    year,
    yearShort,
    monthIndex,
    month,
    monthShort,
    monthNumber,
  };
};
export const dayComparsion = (day1: Date, day2: Date) => {
  return (
    day1.toLocaleString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }) ===
    day2.toLocaleString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' })
  );
};
export const daysNotThisMonth = (day: Date) => {
  const { monthIndex } = CalendarStore;
  return day.getMonth() !== monthIndex;
};

export const checkMobileWeeks = (isMobile: boolean) => {
  const daysOfWeek = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];
  const daysOfWeekShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  return isMobile ? daysOfWeekShort : daysOfWeek;
};
