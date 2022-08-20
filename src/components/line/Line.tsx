import React from 'react';
import {View, ViewStyle} from 'react-native';
import colors from 'utils/colors';

export const Line = ({width, style}: {width: number, style?: ViewStyle}) => {
  return (
    <View
      style={[{
        height: 1,
        width: `${width}%`,
        backgroundColor: colors.gray05,
        alignSelf: 'flex-end',
      },style]}></View>
  );
};
