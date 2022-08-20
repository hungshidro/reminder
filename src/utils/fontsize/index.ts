import { Dimensions,PixelRatio,Platform } from "react-native";

const {width, height} = Dimensions.get('window')
const scale = PixelRatio.getFontScale();
export function actuatedNormalize(size: number) {
    const newSize = size * scale 
     if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
     } else {
       return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
     }
    }

export const fontSize = {
    regular: actuatedNormalize(20),
    big: actuatedNormalize(26),
    small: actuatedNormalize(16)
}