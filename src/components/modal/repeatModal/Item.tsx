import {PaddingView} from 'components/view/PaddingView';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {icon} from 'utils/icons/icons';
import {fontWeights} from 'utils/sizings';
import { RepeatType } from 'utils/types/rootTypes';

export const Item = ({title, setRepeat}: {title: RepeatType; setRepeat: Function}) => {
  return (
    <PaddingView>
      <TouchableOpacity
        style={[styles.row, styles.centerHorizontal]}
        onPress={() => setRepeat(title)}>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', width: '100%'},
          ]}>
          <Text style={[styles.text, {color: colors.black}]}>{title}</Text>
          <Ionicons name={icon.checkmark} color={colors.blue} size={22} />
        </View>
      </TouchableOpacity>
    </PaddingView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    marginTop: 20,
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
