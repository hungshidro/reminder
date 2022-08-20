import {CONSTANTS} from 'utils/constants';

export const timeToString = (dateTime: number): string => {
  const date = new Date(dateTime);
  const currentDate = new Date(Date.now());
  if (
    7 - currentDate.getDay() >= date.getDate() - currentDate.getDate() &&
    date.getDay() >= currentDate.getDay() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getFullYear() === date.getFullYear()
  ) {
    const currentDay = currentDate.getDay();
    const nextDay = date.getDay();
    const day =
      nextDay - currentDay === 0
        ? 'Today'
        : nextDay - currentDay === 1
        ? 'Tomorrow'
        : CONSTANTS.day[nextDay];
    return `${day}, ${date.getHours()}:${
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }`;
  } else {
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
};

export const timeToDayString = (dateTime: number): string => {
  const date = new Date(dateTime);
  const currentDate = new Date(Date.now());
  if (
    7 - currentDate.getDay() >= date.getDate() - currentDate.getDate() &&
    date.getDay() >= currentDate.getDay() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getFullYear() === date.getFullYear()
  ) {
    const currentDay = currentDate.getDay();
    const nextDay = date.getDay();
    const day =
      nextDay - currentDay === 0
        ? 'Today'
        : nextDay - currentDay === 1
        ? 'Tomorrow'
        : CONSTANTS.day[nextDay];
    return day
  } else {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
};

export const timeToTimeString = (dateTime: number): string => {
  const date = new Date(dateTime);
  return (
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  );
};

export const checkTime = (dateTime: number): string => {
  const date = new Date(dateTime);
  if (
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0 &&
    date.getMilliseconds() === 0
  )
    return '';
  else return dateTime === 0 ? '' : ' - ' + timeToTimeString(dateTime);
};

export const checkDayTime = (dateTime: number): string => {
  const date = new Date(dateTime);
  if (
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0 &&
    date.getMilliseconds() === 0
  )
    return timeToDayString(dateTime);
  else return dateTime === 0 ? '' : ' - ' + timeToString(dateTime);
};

export const checkTimeNoneList = (dateTime: number): string => {
  const date = new Date(dateTime);
  if (
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0 &&
    date.getMilliseconds() === 0
  )
    return timeToDayString(dateTime);
  else return dateTime === 0 ? '' : timeToString(dateTime);
};
