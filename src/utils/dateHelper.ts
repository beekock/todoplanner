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
    day1.toLocaleString('ru', { day: 'numeric', month: 'numeric', year: 'numeric' }) ===
    day2.toLocaleString('ru', { day: 'numeric', month: 'numeric', year: 'numeric' })
  );
};
export const daysNotThisMonth = (day: Date) => {
  const { monthIndex } = CalendarStore;
  return day.getMonth() !== monthIndex;
};
