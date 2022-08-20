import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {deleteReminder, updateFlag} from 'redux/reducer/reminder/reminderSlice';
import {listAPI} from 'utils/api/listAPI';
import {reminderAPI} from 'utils/api/reminderAPI';
import colors from 'utils/colors';
import {CONSTANTS} from 'utils/constants';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ReminderDataType} from 'utils/types/rootTypes';
import {Detail} from '../../detail/Detail';
import {FooterSection} from '../AllList/component/SectionFooter/SectionFooter';
import {ItemList} from '../AllList/component/Item/ItemList';
import {ItemToday} from './Component/Item';
import {Footer} from './Component/Footer';
import {decrementCount} from 'redux/reducer/list/listSlice';

export const TodayGroup = ({
  isHide,
  sortBy,
}: {
  isHide: boolean;
  sortBy: 'manual' | 'dateTime' | 'priority';
}) => {
  const [data, setData] = useState<ReminderDataType[]>([]);
  const [isReset, setReset] = useState(false);
  const [indexModalVisible, setIndexModalVisible] = useState(0);
  const [detailData, setDetailData] = useState<ReminderDataType>({
    createAt: Date.now(),
    dateTime: Date.now(),
    flag: false,
    listId: '1',
    name: '',
    notes: '',
    priority: 0,
    id: '',
    image: 'none',
    url: '',
  });

  const list = useAppSelector(state => state.list.list);
  const reminder = useAppSelector(state => state.reminder.reminder);
  const dispatch = useAppDispatch();
  const startDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0,
  ).getTime();
  const endDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
    0,
    0,
    0,
    -1,
  ).getTime();

  const indexModal = CONSTANTS.indexModal;

  const fetchData = useCallback(async () => {
    const allData: ReminderDataType[] = [];
    list.forEach(async (value, index, array) => {
      const res = await reminderAPI.getAllReminder(value.id, 'manual');
      console.log(res);
      const filterData: ReminderDataType[] = res.filter(
        (value: ReminderDataType) => {
          const reminderItem = reminder.find(item => item.id === value.id);
          const date = new Date(value.dateTime);
          return isHide
            ? (new Date().getTime() < value.dateTime ||
                value.dateTime === 0 ||
                (date.getHours() === 0 &&
                  date.getMinutes() === 0 &&
                  date.getSeconds() === 0 &&
                  date.getMilliseconds() === 0)) &&
                reminderItem?.completed === false &&
                value.dateTime >= startDay &&
                value.dateTime <= endDay
            : value.dateTime >= startDay && value.dateTime <= endDay;
        },
      );
      allData.push(...filterData);
      if (index === array.length - 1) setData(allData);
    });
  }, [isReset, isHide]);

  useEffect(() => {
    fetchData();
  }, [isReset, isHide]);

  return (
    <View style={{flexGrow: 1, flexShrink: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ItemToday
            item={item}
            reset={setReset}
            onDeletePressed={async () => {
              const res = await reminderAPI.deleteReminder(
                item.listId,
                item.id ?? '',
              );
              const countRes = await listAPI.updateListCountDown(item.listId);
              dispatch(deleteReminder({id: item.id ?? ''}));
              dispatch(decrementCount({listId: item.listId}));
              setReset(reset => !reset);
            }}
            onFlagPressed={async () => {
              const res = await reminderAPI.updateFlag(
                item.listId,
                item.id ?? '',
                !item.flag,
              );
              dispatch(updateFlag({id: item.id ?? '', flag: !item.flag}));
              setReset(reset => !reset);
            }}
            onDetailPressed={() => {
              setDetailData(item);
              setIndexModalVisible(indexModal.editDetailModal);
            }}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{alignSelf: 'center', color: colors.gray02, marginTop: 100}}>
            Nothing to show
          </Text>
        }
      />
      <Detail
        data={detailData}
        setData={setDetailData}
        indexModalVisible={indexModalVisible}
        setIndexModalVisible={setIndexModalVisible}
        setReset={setReset}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: colors.blue,
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w700,
  },
  row: {
    flexDirection: 'row',
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footerInput: {
    flexGrow: 1,
    marginLeft: 8,
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
});
