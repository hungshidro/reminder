import React, {ReactNode, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {generateData, ItemCalendar} from './CalendarHandler';

export const CalendarPicker = ({
  dateShown,
  setDate,
}: {
  dateShown: {month: number; year: number};
  setDate: Function;
}) => {
  const [isSelected, setSelected] = useState(new Date(Date.now()).getDate());

  const onSelected = useCallback((day: number) => {
    setSelected(day);
    const newDate = new Date();
    newDate.setDate(day)
    newDate.setMonth(dateShown.month)
    newDate.setFullYear(dateShown.year)
    setDate(newDate);
    console.log(newDate.toString())
  },[dateShown])

  const generateLines = (startIndex: number, data: number[]) => {
    const renderLine = (): ReactNode[] => {
      const views = [];
      for (let i = startIndex; i < startIndex + 7; i++) {
        views.push(
          <ItemCalendar
            key={`${dateShown.month}${dateShown.year}${i}`}
            isSelected={isSelected===data[i]}
            onSelected={onSelected}
            item={data[i]}
          />,
        );
      }
      return views;
    };
    return (
      <View
        key={`view${startIndex}`}
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {renderLine()}
      </View>
    );
  }

  const generateListRender = (dateToShow: {month: number; year: number}) => {
    const data = generateData(dateToShow);
    const views = [];
    views.push(generateLines(0, data));
    views.push(generateLines(7, data));
    views.push(generateLines(14, data));
    views.push(generateLines(21, data));
    views.push(generateLines(28, data));
    views.push(generateLines(35, data));
    return views;
  }
  

  return <View>{generateListRender(dateShown)}</View>;
};

const styles = StyleSheet.create({
  container: {},
});
