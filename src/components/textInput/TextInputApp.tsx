import React, { CSSProperties } from 'react';
import {TextInput, TextStyle} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';

export const TextInputApp = ({
  value,
  onChange,
  placeholder,
  style,
}: {
  value: string;
  onChange: Function;
  placeholder: string;
  style?: TextStyle
}) => {
  return (
    <TextInput
      style={[{
        fontSize: fontSize.regular,
        fontWeight: fontWeights.w400,
        color: colors.black,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 9
      },style]}
      textAlign = 'left'
      placeholder={placeholder || ''}
      value={value}
      onChangeText={value => onChange(value)}
      selectionColor={colors.darkBlue}
      placeholderTextColor={colors.gray03}
    />
  );
};
