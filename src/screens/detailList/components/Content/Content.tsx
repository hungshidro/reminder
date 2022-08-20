import {Line} from 'components';
import {AddImageModal} from 'components/modal/addImageModal';
import {ChoseListModal} from 'components/modal/choseListMocal';
import {PriorityModal} from 'components/modal/PriorityModal';
import {RepeatModal} from 'components/modal/repeatModal';
import {SoundPickerModal} from 'components/modal/soundPickerModal';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SwipeableListView,
  Text,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import { decrementCount } from 'redux/reducer/list/listSlice';
import {
  deleteReminder,
  updateCompleted,
  updateFlag,
} from 'redux/reducer/reminder/reminderSlice';
import {listAPI} from 'utils/api/listAPI';
import {reminderAPI} from 'utils/api/reminderAPI';
import colors from 'utils/colors';
import {CONSTANTS} from 'utils/constants';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ReminderDataType, RepeatType} from 'utils/types/rootTypes';
import {EditDetailModal} from './component/EditDetailModal';
import {Item} from './component/ItemList';

export const Content = ({
  listId,
  isHide,
  sortBy,
}: {
  listId: string;
  isHide: boolean;
  sortBy: 'manual' | 'dateTime' | 'priority';
}) => {
  const [data, setData] = useState<ReminderDataType[]>([]);
  const [IsReset, setReset] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<ReminderDataType>({
    createAt: Date.now(),
    dateTime: Date.now(),
    flag: false,
    listId: listId,
    name: '',
    notes: '',
    priority: 0,
    id: '',
    image: 'none',
    url: '',
  });
  const [indexModalVisible, setIndexModalVisible] = useState(0);
  const [indexMutilModalVisible, setindexMutilModalVisible] = useState(0);
  const [locationOpenAddImageModal, setLocationOpenAddImageModal] = useState(0);
  const [repeat, setRepeat] = useState<RepeatType>('Never');
  const [countCompleted, setCountCompleted] = useState(0);
  const [sound, setSound] = useState('default');

  const indexModal = CONSTANTS.indexModal;
  const reminder = useAppSelector(state => state.reminder.reminder);
  const dispatch = useAppDispatch();

  const feftchData = useCallback(async () => {
    const res = await reminderAPI.getAllReminder(listId, sortBy);
    if (isHide) {
      const filterData: ReminderDataType[] = [];
      let completed= 0
      res.map((value: ReminderDataType) => {
        const reminderItem = reminder.find(item => item.id === value.id);
        const date = new Date(value.dateTime);
        if (
          (new Date().getTime() < value.dateTime ||
          (value.dateTime === 0) ||
          (date.getHours() === 0 &&
          date.getMinutes() === 0 &&
          date.getSeconds() === 0 &&
          date.getMilliseconds() === 0)) && reminderItem?.completed === false
        )
          filterData.push(value);
        else completed = completed+1
      });
      setData(filterData);
      setCountCompleted(completed)
    } else setData(res);
  }, [sortBy, isHide, IsReset]);

  useEffect(() => {
    feftchData();
  }, [sortBy, isHide, reminder, IsReset]);

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.centerHorizontal]}>
        <Text
          style={{
            color: colors.gray02,
            fontSize: fontSize.small,
            fontWeight: fontWeights.w400,
          }}>
          {countCompleted} Completed
        </Text>
        <View
          style={{
            borderRadius: 15,
            backgroundColor: colors.gray02,
            borderWidth: 2,
            borderColor: colors.gray02,
            marginHorizontal: 5,
            marginTop: 2,
          }}></View>
        <Text
          style={{
            color: colors.gray03,
            fontSize: fontSize.small,
            fontWeight: fontWeights.w400,
          }}>
          Clear
        </Text>
      </View>
      <Line style={{marginTop: 10}} width={100} />
      <FlatList
        data={data}
        renderItem={({item}: {item: ReminderDataType}) => (
          <Item
            key={item.createAt}
            onDetailPressed={() => {
              setDetailData(item);
              setIndexModalVisible(indexModal.editDetailModal);
            }}
            onFlagPressed={async () => {
              const res = await reminderAPI.updateFlag(
                listId,
                item.id ?? '',
                !item.flag,
              );
              dispatch(updateFlag({id: item.id ?? '', flag: !item.flag}));
              setReset(reset => !reset);
            }}
            onDeletePressed={async () => {
              const res = await reminderAPI.deleteReminder(
                listId,
                item.id ?? '',
              );
              const countRes = await listAPI.updateListCountDown(listId);
              dispatch(deleteReminder({id: item.id ?? ''}));
              dispatch(decrementCount({listId: item.listId,}))
              setReset(reset => !reset);
            }}
            reset={setReset}
            isHide={isHide}
            item={item}
          />
        )}
        ItemSeparatorComponent={() => <Line width={90} />}
        ListEmptyComponent={
          <Text
            style={{alignSelf: 'center', color: colors.gray02, marginTop: 100}}>
            Nothing to show
          </Text>
        }
      />
      <EditDetailModal
        data={detailData}
        repeat={repeat}
        setChildrenModalVisible={setindexMutilModalVisible}
        setData={setDetailData}
        setOpenLocation={setLocationOpenAddImageModal}
        setVisible={setIndexModalVisible}
        visible={indexModalVisible}
        reset={setReset}
        sound={sound}
      />
      <AddImageModal
        location={locationOpenAddImageModal}
        setData={setDetailData}
        setVisible={setindexMutilModalVisible}
        visible={indexMutilModalVisible}
      />
      <RepeatModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        repeat={repeat}
        setRepeat={setRepeat}
      />
      <ChoseListModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        data={detailData}
        setData={setDetailData}
      />
      <PriorityModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        data={detailData}
        setData={setDetailData}
      />
      <SoundPickerModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        sound={sound}
        setSound={setSound}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    marginTop: 10,
    flexGrow: 0,
    flexShrink: 1,
  },
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
});
