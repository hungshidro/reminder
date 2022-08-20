import React, {ReactNode} from 'react';
import {View, ViewProps} from 'react-native';

export const PaddingView = ({children, style}: ViewProps) => {
  return <View style={[style, {padding: 15}]}>{children}</View>;
};
