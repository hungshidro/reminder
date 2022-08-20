import {ReminderDataType} from 'utils/types/rootTypes';
import instance from './instance';

const url = '/reminder';
const listUrl = 'list/';
const getAllReminderByList = async (
  list: string,
  sortBy: 'manual' | 'dateTime' | 'priority',
) => {
  try {
    if (sortBy === 'manual') {
      const response = await instance.get(listUrl + list + url);
      const data = await response.data;
      return data;
    } else if (sortBy === 'dateTime') {
      const response = await instance.get(
        listUrl + list + url + '?sortBy=' + sortBy,
      );
      const data = await response.data;
      return data;
    } else if (sortBy === 'priority') {
      const response = await instance.get(
        listUrl + list + url + '?sortBy=' + sortBy + '&order=desc',
      );
      const data = await response.data;
      return data;
    }

    return [];
  } catch (error) {
    console.log(error);
  }
};

const addNewReminder = async (list: string, data: ReminderDataType) => {
  try {
    const response = await instance.post(listUrl + list + url, data);
    const dataResponse = await response.data;
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

const updateReminder = async (
  list: string,
  id: string,
  data: ReminderDataType,
) => {
  try {
    const response = await instance.put(listUrl + list + url + '/' + id, {
      dateTime: data.dateTime,
      flag: data.flag,
      listId: data.listId,
      name: data.name,
      notes: data.notes,
      priority: data.priority,
      image: data.image,
      tag: data.tag,
      isMessaging: data.isMessaging,
      location: data.location,
      url: data.url,
    });
    const dataResponse = await response.data;
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

const deleteReminder = async (list: string, id: string) => {
  try {
    const response = await instance.delete(listUrl + list + url + '/' + id);
    const dataResponse = await response.data;
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

const updateFlag = async (list: string, id: string, flag: boolean) => {
  try {
    const res = await instance.put(listUrl + list + url + '/' + id, {
      flag: flag,
    });
    const dataResponse = await res.data;
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

const updateName = async (list: string, id: string, name: string) => {
  try {
    const res = await instance.put(listUrl + list + url + '/' + id, {
      name: name,
    });
    const dataResponse = await res.data;
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

const search = async (list: string, search: string) => {
  try {
    console.log(`${listUrl}${list}${url}&search=${search}`);
    const res = await instance.get(`${listUrl}${list}${url}?search=${search}`);
    const dataResponse = res.data;
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const reminderAPI = {
  getAllReminder: getAllReminderByList,
  addNewReminder: addNewReminder,
  updateReminder: updateReminder,
  deleteReminder: deleteReminder,
  updateFlag: updateFlag,
  updateName: updateName,
  search: search,
};
