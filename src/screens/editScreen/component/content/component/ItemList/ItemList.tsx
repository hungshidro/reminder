import React, {useState} from 'react';
import { Dimensions } from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GroupState} from 'redux/reducer/group/groupSlice';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {icon} from 'utils/icons/icons';
import {deviceWidth, fontWeights} from 'utils/sizings';

export const ITEM_HEIGHT = 50;

export const ItemContent = ({
  item,
  type
}: {
  item: GroupState;
  type: 'list' | 'group'
}) => {

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <View style={[styles.row, {width: '100%'}]}>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          {item.show ? (
            <Ionicons
              name={icon.checkmark_circle}
              color={colors.blue}
              size={20}
              style={{alignSelf: 'center'}}
            />
          ) : (
            <View
              style={{
                width: 20,
                height: 20,
                alignSelf: 'center',
                borderRadius: 30,
                borderWidth: 1,
                borderColor: colors.gray03,
              }}></View>
          )}
        </TouchableOpacity>
        <View
          style={[
            styles.icon,
            {backgroundColor: item.color, marginLeft: 10, marginRight: 5},
          ]}>
          <Ionicons
            size={20}
            name={item.icon ?? icon.happy_outline}
            color={colors.white}
          />
        </View>
        <Text style={styles.text}>{item.name}</Text>
        <Ionicons name={icon.list} color={colors.gray03} size={20} style={{position: 'absolute', right: 30}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: ITEM_HEIGHT,
    alignItems: 'flex-start',
    justifyContent: 'center',
    left: 0,
    right: 0,
    paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    padding: 4,
    alignItems: 'center',
    borderRadius: 25,
    minWidth: 30,
  },
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
    color: colors.black,
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'center',
  },
});
