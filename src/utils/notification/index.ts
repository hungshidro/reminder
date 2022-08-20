import PushNotification, {Importance, PushNotificationScheduledLocalObject} from 'react-native-push-notification';
import { useAppDispatch } from 'redux/hook';
import { updateNotification } from 'redux/reducer/reminder/reminderSlice';
import {CONSTANTS} from 'utils/constants';
import {RepeatType} from 'utils/types/rootTypes';

interface IIOSRemoteNotification {
  title: string;
  body: string;
}

export interface IAndroidNotification {
  title: string;
  message: string;
  smallIcon: string;
  date: Date;
  data: {[key: string]: string};
}

interface IRemoteMessage {
  data: {[key: string]: string};
  notification: IIOSRemoteNotification;
}

const aMinuteMilis = 60 * 1000;
const aHourMilis = 60 * aMinuteMilis;
const aDayMilis = 24 * aHourMilis;
const aWeekMilis = 7 * aDayMilis;

export const createNotificationChannel = () => {
  PushNotification?.createChannel(
    {
      channelId: CONSTANTS.notificationDTO.channelId,
      channelName: CONSTANTS.notificationDTO.channelName,
      channelDescription: CONSTANTS.notificationDTO.channelDescription,
      playSound: true,
      importance: Importance.HIGH,
    },
    () => {},
  );
};

export const pushIOSLocalNotification = (remoteMessage: IRemoteMessage) => {
  PushNotification?.localNotification({
    channelId: CONSTANTS.notificationDTO.channelId,
    message: remoteMessage.notification.body,
    title: remoteMessage.notification.title,
    userInfo: remoteMessage.data,
    allowWhileIdle: true,
  });
};

export const pushAndroidLocalNotification = (notification: any) => {
  PushNotification.localNotification({
    channelId: CONSTANTS.notificationDTO.channelId,
    message: notification?.message,
    title: notification.title,
    smallIcon: notification?.smallIcon || '',
  });
};

export const pushAndroidLocalNotificationSchedule = (notification: {
  message: string;
  title: string;
  smallIcon: string;
  date: Date;
  repeat: RepeatType;
  id: string;
  sound?: string
}) => {
  const repeat = notification.repeat;
  let repeatTime:number|undefined;
  let repeatType:"time" | "hour" | "day" | "week" | "minute" | undefined = 'time';
  if(repeat === 'Never') repeatTime = 0;
  else if(repeat === 'Hourly') {repeatType = 'hour'; repeatTime = 1}
  else if(repeat === 'Daily') {repeatType = 'day'; repeatTime = 1}
  else if(repeat === 'Weekly') {repeatType = 'week'; repeatTime = 1}
  else if(repeat === 'Monthly') {repeatType = 'day'; repeatTime = 30}
  else if(repeat === 'Every 3 Month') {repeatType = 'day'; repeatTime = 3}
  else if(repeat === 'Every 6 Month') {repeatType = 'day'; repeatTime = 6}
  else if(repeat === 'Weekdays') {repeatType = undefined; repeatTime = undefined}
  else if(repeat === 'Weekends') {repeatType = undefined; repeatTime = undefined}
  
  PushNotification.localNotificationSchedule({
    channelId: CONSTANTS.notificationDTO.channelId,
    message: notification?.message,
    title: notification.title,
    smallIcon: notification?.smallIcon || '',
    date: notification.date,
    repeatTime: repeatTime,
    repeatType: repeatType,
    id: notification.id,
    soundName: notification.sound??'default'
  });

};

export const cancelNotification = (notifyId: string) => {
  PushNotification.cancelLocalNotification(notifyId)
}
