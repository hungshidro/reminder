import {Line} from 'components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {decrementCount} from 'redux/reducer/list/listSlice';
import {deleteReminder, updateFlag} from 'redux/reducer/reminder/reminderSlice';
import {listAPI} from 'utils/api/listAPI';
import {reminderAPI} from 'utils/api/reminderAPI';
import colors from 'utils/colors';
import {CONSTANTS} from 'utils/constants';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ReminderDataType} from 'utils/types/rootTypes';
import {Detail} from '../../detail/Detail';
import {ItemList} from './component/Item/ItemList';
import {FooterSection} from './component/SectionFooter/SectionFooter';

export type dataType = {
  title: string;
  data: ReminderDataType[];
  titleColor: string;
  id: string;
};

export const AllListView = ({
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

  const fetchData = useCallback(async () => {
    const allData: dataType[] = [];
    list.forEach(async (value, index, array) => {
      const res = await reminderAPI.getAllReminder(value.id, sortBy);
      if (isHide) {
        const filterData: ReminderDataType[] = res.filter(
          (value: ReminderDataType) => {
            const reminderItem = reminder.find(item => item.id === value.id);
            const date = new Date(value.dateTime);
            return (
              (new Date().getTime() < value.dateTime ||
                value.dateTime === 0 ||
                (date.getHours() === 0 &&
                  date.getMinutes() === 0 &&
                  date.getSeconds() === 0 &&
                  date.getMilliseconds() === 0)) &&
              reminderItem?.completed === false
            );
          },
        );
        allData.push({
          title: value.name,
          data: filterData,
          titleColor: value.color ?? colors.blue,
          id: value.id,
        });
      } else
        allData.push({
          title: value.name,
          data: res,
          titleColor: value.color ?? colors.blue,
          id: value.id,
        });
      if (index === array.length - 1) {
        setData(allData);
      }
    });
  }, [isReset, isHide]);

  useEffect(() => {
    fetchData();
  }, [isReset, isHide]);

  return (
    <View>
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
        renderItem={({item, section}) => (
          <ItemList
            item={item}
            reset={setReset}
            onDeletePressed={async () => {
              const res = await reminderAPI.deleteReminder(
                section.id,
                item.id ?? '',
              );
              const countRes = await listAPI.updateListCountDown(section.id);
              dispatch(deleteReminder({id: item.id ?? ''}));
              dispatch(decrementCount({listId: item.listId}));
              setReset(reset => !reset);
            }}
            onFlagPressed={async () => {
              const res = await reminderAPI.updateFlag(
                section.id,
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
          <FooterSection listId={infor.section.id} reset={setReset} />
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
