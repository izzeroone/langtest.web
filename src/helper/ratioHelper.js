import {Dimensions, PixelRatio} from 'react-native';
const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  return PixelRatio.roundToNearestPixel(screenWidth * widthPercent / 100);
};
const heightPercentageToDP = (heightPercent)  => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
return PixelRatio.roundToNearestPixel(screenHeight * heightPercent / 100);
};
export {
  widthPercentageToDP,
  heightPercentageToDP
};