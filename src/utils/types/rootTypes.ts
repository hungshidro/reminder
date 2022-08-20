import colors from 'utils/colors';

export type ReminderDataType = {
  id?: string;
  createAt: number;
  name: string;
  notes: string;
  dateTime: number;
  location?: string;
  isMessaging?: boolean;
  tag?: string;
  flag: boolean | false;
  priority: number;
  listId: string;
  image?: string;
  url?: string;
};

export type ListType = {
  id?: string;
  createAt: number;
  name: string;
  color: string;
  icon: string;
  count?: number;
  completed?: number;
};

export type RepeatType =
  | 'Never'
  | 'Hourly'
  | 'Daily'
  | 'Weekdays'
  | 'Weekends'
  | 'Weekly'
  | 'Monthly'
  | 'Every 3 Month'
  | 'Every 6 Month';
