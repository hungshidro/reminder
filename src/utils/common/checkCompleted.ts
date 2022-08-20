export const checkCompleted = (dateTime: number): boolean => {
  const date = new Date(dateTime);
  if(date.getHours() ===0 && date.getMinutes() ===0 && date.getSeconds() ===0 && date.getMilliseconds() ===0) return false
  else if(new Date().getTime() > dateTime && dateTime != 0) return true
  else return false
};
