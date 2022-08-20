import { isAndroid } from 'utils/sizings';

//todo: decimal
const formatDecimal = (amount: string | number) => {
	return Number(amount)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const formatMoneyAUD = (text: string | number):string => {
	return `$${formatDecimal(text)}`;
};

export const formatPhotoUri = (uri: any) => {
	return isAndroid ? uri : uri?.replace('file://', '');
};
