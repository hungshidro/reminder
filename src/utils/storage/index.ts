import AsyncStorage from '@react-native-community/async-storage';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const USER_DATA = 'USER_DATA';
const IS_LOGGED_IN = 'IS_LOGGED_IN';

export const saveUserStorage = async (key: string, value: any) => {
	try {
		await AsyncStorage.setItem(key, value);
		return true;
	} catch (error) {
		return false;
	}
};

export const getUserStorage = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return JSON.parse(value);
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const clearUserStorage = async () => {
	try {
		await AsyncStorage.removeItem(`@${IS_LOGGED_IN}:key`);
		await AsyncStorage.removeItem(`@${ACCESS_TOKEN}:key`);
		await AsyncStorage.removeItem(`@${USER_DATA}:key`);
		await AsyncStorage.removeItem(`@${REFRESH_TOKEN}:key`);
		return true;
	} catch (error) {
		return false;
	}
};

export const saveUserData = async (value: any) => {
	saveUserStorage(`@${USER_DATA}:key`, JSON.stringify(value));
};

export const getUserData = async () => {
	const result = await getUserStorage(`@${USER_DATA}:key`);
	return result;
};

export const saveAccessToken = async (value: string) => {
	saveUserStorage(`@${ACCESS_TOKEN}:key`, JSON.stringify(value));
};

export const getAccessToken = async () => {
	const result = await getUserStorage(`@${ACCESS_TOKEN}:key`);
	return result;
};

export const saveRefreshToken = async (value: string) => {
	saveUserStorage(`@${REFRESH_TOKEN}:key`, JSON.stringify(value));
};

export const getRefreshToken = async () => {
	const result = await getUserStorage(`@${REFRESH_TOKEN}:key`);
	return result;
};

export const saveIsLoggedIn = async (value: boolean) => {
	saveUserStorage(`@${IS_LOGGED_IN}:key`, JSON.stringify(value));
};

export const getIsLoggedIn = async () => {
	const result = await getUserStorage(`@${IS_LOGGED_IN}:key`);
	return result;
};
