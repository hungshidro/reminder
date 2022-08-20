import {Line} from 'components/line/Line';
import {TextInputApp} from 'components/textInput/TextInputApp';
import {RadiusView} from 'components/view/RadiusView';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {MyModal} from '../modalBase/Modal';
import {CONSTANTS} from 'utils/constants';
import {ChevronView} from 'components/view/ChevronView';
import {ReminderDataType, RepeatType} from 'utils/types/rootTypes';
import {pushAndroidLocalNotificationSchedule} from 'utils/notification';
import {reminderAPI} from 'utils/api/reminderAPI';
import {listAPI} from 'utils/api/listAPI';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {incrementCount} from 'redux/reducer/list/listSlice';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {addNewReminder} from 'redux/reducer/reminder/reminderSlice';

export const AddReminderModal = ({
  visible,
  setVisible,
  data,
  setData,
  repeat,
}: {
  visible: number;
  setVisible: Function;
  data: ReminderDataType;
  setData: Function;
  repeat: RepeatType;
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const list = useAppSelector(state => state.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.name != '') setIsFilled(true);
    else setIsFilled(false);
  }, [data.name]);

  const indexModal = CONSTANTS.indexModal;
  const headerLeft = (
    <Text style={[styles.text, {color: colors.blue}]}>Cancel</Text>
  );
  const headerRight = (
    <Text
      style={[
        styles.text,
        {
          color: isFilled ? colors.blue : colors.gray02,
          fontWeight: fontWeights.w600,
        },
      ]}>
      Add
    </Text>
  );

  const onChangeTitle = (value: string) => {
    setData((prevState: ReminderDataType) => {
      prevState.name = value;
      return prevState;
    });
    setTitle(value);
  };
  const onChangeNotes = (value: string) => {
    setData((prevState: ReminderDataType) => {
      prevState.notes = value;
      return prevState;
    });
    setNotes(value);
  };
  const resetData = () => {
    setData({
      createAt: new Date().getTime(),
      dateTime: 0,
      flag: false,
      listId: '1',
      name: '',
      notes: '',
      location: 'none',
      tag: 'none',
      priority: 0,
      image: 'none',
    });
  };
  const handlerRight = async () => {
    const res = await reminderAPI.addNewReminder(data.listId, data);
    if (res) {
      setVisible(indexModal.closeModal);
      ToastAndroid.show('Success', ToastAndroid.LONG);
      const updateCountRes = await listAPI.updateListCountUp(data.listId);
      dispatch(incrementCount({listId: data.listId}));
      dispatch(
        addNewReminder({
          id: res.data.id,
          name: data.name,
          notificationID: res.data.id,
          completed: false,
          repeat: 'Never',
          flag: data.flag,
          sound: 'default',
          dateTime: data.dateTime,
          priority: data.priority,
          listId: data.listId,
          notes: data.notes,
          image: data.image
        }),
      );
      if (Date.now() < data.dateTime) {
        pushAndroidLocalNotificationSchedule({
          date: new Date(new Date(data.dateTime).setSeconds(0)),
          message: 'Notification',
          title: 'Title',
          smallIcon: '',
          repeat: repeat,
          id: res.data.id,
        });
      }
      resetData();
    } else {
      ToastAndroid.show('Fail', ToastAndroid.LONG);
    }
  };
  const getListName = () => {
    let listName = '';
    list.list.forEach(value => {
      if (value.id === data.listId) {
        listName = value.name;
      }
    });
    if (listName === '') return 'None';
    else return listName;
  };
  return (
    <MyModal
      visible={visible === indexModal.addReminderModal ? true : false}
      setVisible={setVisible}
      headerLeft={headerLeft}
      headerRight={headerRight}
      headerTitle="New Reminder"
      disableRight={!isFilled}
      handlerHeaderRight={handlerRight}
      handlerHeaderLeft={() => setVisible(indexModal.closeModal)}>
      <View style={styles.container}>
        <RadiusView>
          <TextInputApp
            style={{paddingHorizontal: 5}}
            value={data.name}
            onChange={onChangeTitle}
            placeholder="Title"
          />
          <Line width={86} />
          <TextInputApp
            style={{paddingHorizontal: 5}}
            value={data.notes}
            onChange={onChangeNotes}
            placeholder="Notes"
          />
        </RadiusView>
        <RadiusView style={styles.item}>
          <ChevronView
            title="Details"
            iconShown={false}
            handlerOnPress={() => {
              if (data.dateTime < new Date().getTime())
                setData((prevData: ReminderDataType) => {
                  prevData.dateTime = new Date().getTime();
                  return prevData;
                });
              setVisible(indexModal.detailModal);
            }}
          />
        </RadiusView>
        <RadiusView style={styles.item}>
          <ChevronView
            title="List"
            iconShown={false}
            itemPicked={getListName()}
            handlerOnPress={() => {
              setVisible(indexModal.choseListModal);
            }}
          />
        </RadiusView>
      </View>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 30,
  },
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
  row: {
    flexDirection: 'row',
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    marginTop: 20,
  },
});
