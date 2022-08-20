import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'utils/colors';
import {fontWeights} from 'utils/sizings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import {fontSize} from 'utils/fontsize';
import {generateData} from './CalendarHandler';
import {CalendarPicker} from './CalendarPicker';
import {CONSTANTS} from 'utils/constants';

export const CalendarView = ({setDate}: {setDate: Function}) => {
  const currentDate = new Date(Date.now());
  const [dateShown, setDateShown] = useState({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });
  const [title, setTitle] = useState(
    `${CONSTANTS.month[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  );

  const month = CONSTANTS.month;

  const toNextMonth = () => {
    if (dateShown.month === 12) {
      setDateShown((date) => {
        return {month: 1, year: date.year + 1};
      });
    } else {
      setDateShown((date) => {
        return {month: date.month + 1, year: date.year};
      });
      
    }
  };

  const toPreviousMonth = () => {
    if (dateShown.month === 0)
      setDateShown(date => {
        return {month: 12, year: date.year - 1};
      });
    else
      setDateShown(date => {
        return {month: date.month - 1, year: date.year};
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.centerVertical, styles.wrapper]}>
        <View
          style={[
            styles.row,
            styles.wrapper,
            {justifyContent: 'space-between'},
          ]}>
          <TouchableOpacity style={styles.centerVertical}>
            <View style={[styles.centerHorizontal, styles.row]}>
              <Text style={[styles.title]}>{title}</Text>
              <Ionicons
                name={icon.chevron_foward}
                size={15}
                color={colors.blue}
              />
            </View>
          </TouchableOpacity>
          <View style={[styles.centerHorizontal, styles.row]}>
            <TouchableOpacity onPress={() => toPreviousMonth()}>
              <Ionicons
                name={icon.chevron_back}
                size={27}
                color={colors.blue}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toNextMonth()}>
              <Ionicons
                name={icon.chevron_foward}
                size={27}
                color={colors.blue}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View
          style={[
            styles.wrapper,
            styles.row,
            {justifyContent: 'space-between', marginVertical: 5},
          ]}>
          <Text style={styles.dayTitle}>SUN</Text>
          <Text style={styles.dayTitle}>MON</Text>
          <Text style={styles.dayTitle}>TUE</Text>
          <Text style={styles.dayTitle}>WEB</Text>
          <Text style={styles.dayTitle}>THU</Text>
          <Text style={styles.dayTitle}>FRI</Text>
          <Text style={styles.dayTitle}>SAT</Text>
        </View>
        <CalendarPicker dateShown={dateShown} setDate={setDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  wrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerVertical: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {},
  title: {
    fontWeight: fontWeights.w600,
    color: colors.black,
    fontSize: fontSize.small,
  },
  dayTitle: {
    fontSize: fontSize.small,
    fontWeight: fontWeights.w400,
    color: colors.gray03,
  },
});
