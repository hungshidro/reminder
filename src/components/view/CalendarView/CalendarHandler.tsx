import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';

const getNumberOfDay = (dateToShow: {month: number; year: number}): number => {
  return new Date(dateToShow.year, dateToShow.month + 1, 0).getDate();
};

const getStartDayMonth = (dateToShow: {
  month: number;
  year: number;
}): number => {
  return new Date(dateToShow.year, dateToShow.month, 1).getDay();
};

export const generateData = (dateToShow: {month: number; year: number}) => {
  const numberOfDay = getNumberOfDay(dateToShow);
  const dayStart = getStartDayMonth(dateToShow);
  const data = [];
  for (let i = 0; i < dayStart; i++) {
    data.push(0);
  }
  for (let i = 0; i < numberOfDay; i++) {
    data.push(i + 1);
  }
  for (let i = 0; i < 42 - numberOfDay - dayStart; i++) {
    data.push(0);
  }
  return data;
};

export const ItemCalendar = ({
  item,
  isSelected,
  onSelected,
}: {
  item: number;
  isSelected: boolean;
  onSelected: Function;
}) => {
  return (
    <View
      style={{
        minHeight: 30,
        minWidth: 30,
        justifyContent: 'center',
        backgroundColor: isSelected? colors.blue : colors.white,
        borderRadius: 20
      }}>
      <TouchableOpacity style={{justifyContent: 'center',}} onPress={() => onSelected(item)} disabled={item === 0}>
        <Text
          style={[
            styles.text,
            {
              color: isSelected? colors.white : colors.black,
              textAlign: 'center'
            },
          ]}>
          {item === 0 ? '' : item}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.small,
    fontWeights: fontWeights.w400,
  },
  selected: {
    backgroundColor: colors.blue,
  },
  container: {
    borderRadius: 20,
  },
});
