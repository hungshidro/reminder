import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ItemType} from '../Section/ItemList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import { ListType } from 'utils/types/rootTypes';

export const FlatItem = ({
  item,
  onPress
}:{
  item: ListType;
  onPress?: Function;
}) => {
  return (
    <TouchableOpacity onPress={() => {if(onPress) onPress()}}>
      <View style={styles.container}>
        <View style={[styles.icon, {backgroundColor: item.color}]}>
          <Ionicons name={item.icon} size={20} color={colors.white} />
        </View>
        <View style={[styles.titleWrapper, styles.centerLeft]}>
          <Text style={[styles.title, styles.text]}>{item.name}</Text>
        </View>
        <View style={styles.centerLeft}>
          <Text style={[styles.text, styles.count]}>{item.count}</Text>
        </View>
        <View style={styles.centerLeft}>
          <Ionicons
            name={icon.chevron_foward}
            size={20}
            color={colors.gray05}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 11,
    paddingVertical: 13,
  },
  icon: {
    padding: 4,
    alignItems: 'center',
    borderRadius: 19,
    minWidth: 30,
  },
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
  title: {
    color: colors.black,
  },
  titleWrapper: {
    flexGrow: 1,
    marginHorizontal: 9,
  },
  count: {
    color: colors.gray03,
  },
  centerLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
