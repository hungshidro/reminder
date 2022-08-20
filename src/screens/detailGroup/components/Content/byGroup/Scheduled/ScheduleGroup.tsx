import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {Line} from 'components';
import {ItemFlaged} from '../Flaged/component/Item';
import {ItemToday} from '../Today/Component/Item';
import {FooterSection} from './component/FooterSection';
import {decrementCount} from 'redux/reducer/list/listSlice';

export type dataType = {
  title: string;
  data: ReminderDataType[];
  titleColor: string;
  id: string;
};

export const ScheduleGroup = ({
  isHide,
  sortBy,
}: {
  isHide: boolean;
  sortBy: 'manual' | 'dateTime' | 'priority';
}) => {
  const [data, setData] = useState<dataType[]>([]);
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
  const indexModal = CONSTANTS.indexModal;
  const currentDate = new Date();
  const startDay = useMemo(
    () =>
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0,
        0,
      ).getTime(),
    [],
  );
  const endWeek = useMemo(() => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1 + ((7 - currentDate.getDay()) % 7),
      0,
      0,
      0,
      -1,
    ).getTime();
  }, []);

  const fetchData = useCallback(async () => {
    const scheduleData: ReminderDataType[] = [];
    list.forEach(async (value, index, arr) => {
      const res = await reminderAPI.getAllReminder(value.id, 'manual');
      const filterData = res.filter((value: ReminderDataType) => {
        const reminderItem = reminder.find(item => item.id === value.id);
        const date = new Date(value.dateTime);
        return !isHide
          ? value.dateTime >= startDay && value.dateTime <= endWeek
          : value.dateTime >= startDay &&
              value.dateTime <= endWeek &&
              (new Date().getTime() < value.dateTime ||
                value.dateTime === 0 ||
                (date.getHours() === 0 &&
                  date.getMinutes() === 0 &&
                  date.getSeconds() === 0 &&
                  date.getMilliseconds() === 0)) &&
              reminderItem?.completed === false;
      });
      scheduleData.push(...filterData);
      if (index === arr.length - 1) {
        scheduleData.sort(
          (value1, value2) => value1.dateTime - value2.dateTime,
        );
        splitDatatoSchcedule(scheduleData);
      }
    });
  }, [isReset, isHide]);

  const splitDatatoSchcedule = (arr: ReminderDataType[]) => {
    let i = 0;
    const scheduleData = new Map<number, ReminderDataType[]>();
    arr.forEach((value, index) => {
      const date = new Date(value.dateTime);
      if (scheduleData.has(date.getDay())) {
        const prevData = scheduleData.get(date.getDay());
        prevData?.push(value);
        scheduleData.set(date.getDay(), prevData ?? []);
      } else {
        const array: ReminderDataType[] = [];
        array.push(value);
        scheduleData.set(date.getDay(), array);
      }
    });

    const allData: dataType[] = [];
    for (let [key, value] of scheduleData) {
      if (key === currentDate.getDay())
        allData.push({
          data: value,
          id: key.toString(),
          title: 'Today',
          titleColor: colors.black,
        });
      else if (key === currentDate.getDay() + 1)
        allData.push({
          data: value,
          id: key.toString(),
          title: 'Tomorrow',
          titleColor: colors.black,
        });
      else
        allData.push({
          data: value,
          id: key.toString(),
          title: CONSTANTS.day[key],
          titleColor: colors.black,
        });
    }
    setData(allData);
  };

  useEffect(() => {
    fetchData();
  }, [isReset, isHide]);

  return (
    <View style={{flexGrow: 1, flexShrink: 1}}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.createAt.toString() + item.id}
        renderSectionHeader={item => (
          <Text
            style={[
              styles.title,
              {
                paddingLeft: 20,
                color: item.section.titleColor,
                marginBottom: 10,
              },
            ]}>
            {item.section.title}
          </Text>
        )}
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
        SectionSeparatorComponent={() => <Line width={100} />}
        ItemSeparatorComponent={() => <Line width={85} />}
        renderSectionFooter={infor => (
          <FooterSection
            reset={setReset}
            day={infor.section.id as unknown as number}
          />
        )}
      />
      <Detail
        data={detailData}
        setData={setDetailData}
        indexModalVisible={indexModalVisible}
        setIndexModalVisible={setIndexModalVisible}
        setReset={setReset}
      />
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
