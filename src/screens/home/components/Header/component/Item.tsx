import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ReminderDataType} from 'utils/types/rootTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import {checkTimeNoneList} from 'utils/common/time';

export const SearchItem = ({item}: {item: ReminderDataType}) => {
  const time = checkTimeNoneList(item.dateTime);
  return (
    <TouchableHighlight>
      <View
        style={[
          styles.row,
          styles.centerHorizontal,
          {
            paddingVertical: 13,
            paddingRight: 20,
            backgroundColor: colors.white,
          },
        ]}>
        <View style={{flexGrow: 1}}>
          <View style={[styles.row, styles.centerHorizontal]}>
            <Text
              style={{
                color: colors.blue,
                fontSize: fontSize.regular,
                marginLeft: 10,
              }}>
              {item.priority === 1
                ? '!'
                : item.priority === 2
                ? '!!'
                : item.priority === 3
                ? '!!!'
                : ''}
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: fontSize.regular,
                fontWeight: fontWeights.w400,
                flexGrow: 1,
                height: 24.5,
                padding: 0,
                maxWidth: 250,
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{marginLeft: 10}}>
            {item.notes != '' && (
              <Text
                style={{
                  color: colors.gray02,
                  fontSize: fontSize.small,
                  fontWeight: fontWeights.w400,
                }}>
                {item.notes}
              </Text>
            )}
            {Date.now() < item.dateTime && (
              <Text
                style={{
                  color: colors.gray02,
                  fontSize: fontSize.small,
                  fontWeight: fontWeights.w400,
                }}>
                {time}
              </Text>
            )}
            {item.image != 'none' && (
              <Image
                key={item.id}
                style={{height: 35, width: 35, marginRight: 7}}
                source={{uri: item.image}}
              />
            )}
          </View>
        </View>
        {item.flag && (
          <Ionicons
            name={icon.flag}
            color={colors.orange_dark}
            size={20}
            style={{alignSelf: 'flex-start'}}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  centerVertical: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  swipeButton: {
    color: colors.white,
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
    textAlign: 'center',
  },
  button: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
  },
});
