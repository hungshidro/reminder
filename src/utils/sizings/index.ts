import { PixelRatio, Dimensions } from 'react-native';
import { Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export const deviceWidth = width;
export const deviceHeight = height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isTablet = () => {
	let pixelDensity = PixelRatio.get();
	let adjustedWidth = width * pixelDensity;
	let adjustedHeight = height * pixelDensity;
	if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
		return true;
	} else {
		return (
			pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
		);
	}
};

export type TFontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;

export const fontWeights = {
	w100: '100' as TFontWeight,
	w200: '200' as TFontWeight,
	w300: '300' as TFontWeight,
	w400: '400' as TFontWeight,
	w500: '500' as TFontWeight,
	w600: '600' as TFontWeight,
	w700: '700' as TFontWeight,
	w800: '800' as TFontWeight,
	w900: '900' as TFontWeight
};
