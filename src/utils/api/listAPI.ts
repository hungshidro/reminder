import { ListType } from 'utils/types/rootTypes';
import instance from './instance';

const url = 'list/';

const getAllList = async () => {
    try {
        const res = await instance.get(url);
        const data = await res.data;
        return data
    } catch (error) {
        console.log(error)
    }
}

const getListByID =async (listId: string) => {
    try {
        const res = await instance.get(url+listId);
        const data = await res.data;
        return data
    } catch (error) {
        console.log(error)
    }
}

const updateListCountUp = async (listID: string, ) => {
    try {
        const listData = await getListByID(listID)
        const count = listData.count;
        const res = await instance.put(url + listID, {count: count+1});
        const dataResponse = await res.data;
        return dataResponse
    } catch (error) {
        console.log(error)
    }
}
const updateListCountDown = async (listID: string, ) => {
    try {
        const listData = await getListByID(listID)
        const count = listData.count;
        const res = await instance.put(url + listID, {count: count-1});
        const dataResponse = await res.data;
        return dataResponse
    } catch (error) {
        console.log(error)
    }
}

const addNewList = async (data: ListType) => {
    try {
        const res = await instance.post(url,data);
        const resData = await res.data;
        return resData;
    } catch (error) {
        console.log(error)
    }
}

const deleteList =async (listId: string) => {
    try {
        const res = await instance.delete(url + listId);
        const resData = await res.data
        return resData
    } catch (error) {
        console.log(error)
    }
}


export const listAPI = {
    getAllList: getAllList,
    updateListCountUp: updateListCountUp,
    addNewList: addNewList,
    deleteList: deleteList,
    updateListCountDown: updateListCountDown
}