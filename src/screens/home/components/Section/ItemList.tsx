import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import colors from 'utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';

export interface ItemType {
  id: string;
  title: string;
  icon: {
    name: string;
    color: string;
  };
  count: number;
}

export const Item = ({
  item, 
  onPressItem
}:{
  item: ItemType; 
  onPressItem?: Function
}) => {
  const all = item;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {if(onPressItem) onPressItem()}}>
        <View style={styles.wrapper}>
          <View style={[styles.icon, {backgroundColor: item.icon.color}]}>
            <Ionicons size={20} name={item.icon.name} color={colors.white} />
          </View>
          <Text style={styles.textCount}>{item.count}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 12,
    width: '48%',
    marginTop: 15,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCount: {
    fontSize: fontSize.big,
    fontWeight: fontWeights.w800,
    color: colors.black,
  },
  title: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w600,
    color: colors.gray02,
  },
  icon: {
    padding: 4,
    alignItems: 'center',
    borderRadius: 25,
    minWidth: 33,
  },
  textWrapper: {
    marginTop: 13,
  },
});
