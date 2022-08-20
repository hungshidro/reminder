import {FlatList, View} from 'react-native';
import {Item, ItemType} from './ItemList';
import React, {useEffect, useMemo, useState} from 'react';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';
import {navigate} from 'navigation/service';
import screenNames from 'utils/screenName';
import {useAppSelector} from 'redux/hook';

export const ListSection = () => {
  const [flaggedCount, setFlaggedCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);
  const list = useAppSelector(state => state.list.list);
  const reminder = useAppSelector(state => state.reminder.reminder);

  const current = new Date()
  const startDay = useMemo(()=>new Date(current.getFullYear(),current.getMonth(), current.getDate(),0,0,0,0).getTime(),[])
  const endDay = useMemo(()=>new Date(current.getFullYear(),current.getMonth(), current.getDate()+1,0,0,0,-1).getTime(),[])

  const endWeek = useMemo(() => {
    return new Date(current.getFullYear(),current.getMonth(),current.getDate()+1 +(7-current.getDay())%7,0,0,0,-1).getTime()
  },[])

  useEffect(() => {
    let today = 0,flag = 0,schedule = 0;
    reminder.forEach(value => {
      if (value.flag) flag++
      if(value.dateTime) if (value.dateTime >= startDay && value.dateTime <= endDay) today++
      if(value.dateTime) if( value.dateTime >= startDay && value.dateTime <= endWeek) schedule++
    });
    setFlaggedCount(flag)
    setTodayCount(today)
    setScheduleCount(schedule)
  }, [reminder]);

  const data = [
    {
      id: '1',
      title: 'Today',
      icon: {name: icon.today, color: colors.blue},
      count: todayCount,
    },
    {
      id: '2',
      title: 'Schedule',
      icon: {name: icon.calendar, color: colors.red},
      count: scheduleCount,
    },
    {
      id: '3',
      title: 'All',
      icon: {name: icon.albums, color: colors.gray02_dark},
      count: reminder.length,
    },
    {
      id: '4',
      title: 'Flagged',
      icon: {name: icon.flag, color: colors.orange_dark},
      count: flaggedCount,
    },
  ];

  const renderItem = ({item}: {item: ItemType}) => (
    <Item
      item={item}
      onPressItem={() =>
        navigate(screenNames.GROUP_SCREEN, {
          groupName: item.title,
          color: item.icon.color,
        })
      }></Item>
  );

  return (
    <FlatList
      columnWrapperStyle={{justifyContent: 'space-between'}}
      style={{marginTop: 13, flexGrow: 0, flexShrink: 0}}
      data={data}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};
