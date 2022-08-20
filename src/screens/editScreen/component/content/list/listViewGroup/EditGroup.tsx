import React, {useEffect, useMemo, useState} from 'react';
import DraggableFlatList, {
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';
import { color } from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {GroupState, updateCount} from 'redux/reducer/group/groupSlice';
import colors from 'utils/colors';
import {DragableList} from '../../component/DragableList/DragableList';
import {ItemContent, ITEM_HEIGHT} from '../../component/ItemList/ItemList';

export const EditGroup = () => {
  const reminder = useAppSelector(state => state.reminder.reminder);
  const group = useAppSelector(state => state.group.group);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<GroupState[]>(group);
  const current = new Date();
  const startDay = useMemo(
    () =>
      new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        0,
        0,
        0,
        0,
      ).getTime(),
    [],
  );
  const endDay = useMemo(
    () =>
      new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate() + 1,
        0,
        0,
        0,
        -1,
      ).getTime(),
    [],
  );

  const endWeek = useMemo(() => {
    return new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1 + ((7 - current.getDay()) % 7),
      0,
      0,
      0,
      -1,
    ).getTime();
  }, []);

  useEffect(() => {
    let today = 0,
      flag = 0,
      schedule = 0;
    reminder.forEach(value => {
      if (value.flag) flag++;
      if (value.dateTime)
        if (value.dateTime >= startDay && value.dateTime <= endDay) today++;
      if (value.dateTime)
        if (value.dateTime >= startDay && value.dateTime <= endWeek) schedule++;
    });
    dispatch(updateCount({name: 'Today', count: today}));
    dispatch(updateCount({name: 'Schedule', count: schedule}));
    dispatch(updateCount({name: 'All', count: reminder.length}));
    dispatch(updateCount({name: 'Flagged', count: flag}));
  }, [reminder]);
  console.log(data);
  return (
    <DragableList
      contentContainerStyle={{height: group.length * ITEM_HEIGHT, backgroundColor: colors.white, borderRadius: 14}}
      style={{flexGrow: 0, marginTop: 20}}
      list={data}
      renderItem={item => <ItemContent item={item} type={'group'} />}
    />
  );
};
