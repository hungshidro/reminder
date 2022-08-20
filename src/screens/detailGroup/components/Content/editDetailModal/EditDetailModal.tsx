import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  GestureResponderEvent,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import {CONSTANTS} from 'utils/constants';
import {SwitchView} from 'components/view/SwitchView';
import {RadiusView} from 'components/view/RadiusView';
import {Line} from 'components/line/Line';
import {ChevronView} from 'components/view/ChevronView';
import {PaddingView} from 'components/view/PaddingView';
import {TextInputApp} from 'components/textInput/TextInputApp';
import {CalendarView} from 'components/view/CalendarView/Calendar';
import DatePicker from 'react-native-date-picker';
import {ReminderDataType, RepeatType} from 'utils/types/rootTypes';
import {
  cancelNotification,
  pushAndroidLocalNotificationSchedule,
} from 'utils/notification';
import {reminderAPI} from 'utils/api/reminderAPI';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {
  updateCompleted,
  updateName,
  updateReminder,
} from 'redux/reducer/reminder/reminderSlice';
import {MyModal} from 'components/modal/modalBase/Modal';
export const EditDetailModal = ({
  visible,
  setVisible,
  data,
  setData,
  setChildrenModalVisible,
  setOpenLocation,
  repeat,
  reset,
  sound,
}: {
  visible: number;
  setVisible: Function;
  data: ReminderDataType;
  setData: Function;
  setChildrenModalVisible: Function;
  setOpenLocation: Function;
  repeat: RepeatType;
  reset: Function;
  sound: string;
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isDatePickerEnable, setDatePickerEnable] = useState(false);
  const [isTimePickerEnable, setTimePickerEnable] = useState(false);
  const [isLocationEnable, setIsLocationEnable] = useState(false);
  const [isMessagingEnable, setIsMessagingEnable] = useState(false);
  const [isFlagEnable, setIsFlagEnable] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [date, setDate] = useState(new Date());
  const [onkeyboard, setOnkeyboard] = useState(38);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [url, setUrl] = useState('');

  const reminder = useAppSelector(state => state.reminder.reminder);
  const reminderItem = reminder.find(item => item.id === data.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.name != '') setIsFilled(true);
    else setIsFilled(false);
  }, [data.name]);

  useEffect(() => {
    setDate(data.dateTime === 0 ? new Date() : new Date(data.dateTime));
    setIsMessagingEnable(data.isMessaging ?? false);
    setIsFlagEnable(data.flag);
    setTitle(data.name);
    setNotes(data.notes);
  }, [data]);

  const indexModal = CONSTANTS.indexModal;
  const indexMultiModal = CONSTANTS.indexMutilModal;
  const currentDate = new Date(Date.now());

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
  const onChangeURL = (value: string) => {
    setData((prevState: ReminderDataType) => {
      prevState.url = value;
      return prevState;
    });
    setUrl(value);
  };

  const headerLeft = (
    <View style={[styles.row, styles.centerHorizontal]}>
      <Text style={[styles.text, {color: colors.blue}]}>Cancel</Text>
    </View>
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
      Done
    </Text>
  );
  const resetData = () => {
    setData({
      createAt: new Date().getTime(),
      dateTime: new Date().getTime(),
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
  //handler right button
  const handlerRight = async () => {
    setDate(prevDate => new Date(prevDate.setSeconds(0)));
    setData((prevData: ReminderDataType) => {
      prevData.dateTime = date.getTime();
      return prevData;
    });
    const id = data.id;
    delete data.id;
    const res = await reminderAPI.updateReminder(data.listId, id ?? '', {
      createAt: data.createAt,
      dateTime: data.dateTime,
      flag: data.flag,
      listId: data.listId,
      name: data.name,
      notes: data.notes,
      priority: data.priority,
      image: data.image,
      tag: data.tag,
      isMessaging: data.isMessaging,
      location: data.location,
      url: data.url,
    });
    if (res) {
      setVisible(indexModal.closeModal);
      ToastAndroid.show('Success', ToastAndroid.LONG);
      cancelNotification(data.id ?? '');
      dispatch(
        updateReminder({
          id: data.id ?? '',
          data: {
            id: data.id ?? '',
            name: data.name,
            completed: data.dateTime > new Date().getTime() ? false : true,
            flag: data.flag,
            notificationID: data.id??'',
            repeat: repeat,
            sound: sound,
            dateTime: data.dateTime,
            priority: data.priority,
            listId: data.listId,
            notes: data.notes,
            image: data.image
          },
        }),
      );
      if (Date.now() < data.dateTime) {
        pushAndroidLocalNotificationSchedule({
          date: date,
          message: 'Notification',
          title: 'Title',
          smallIcon: '',
          repeat: repeat,
          id: data.id ?? '',
          sound: sound,
        });
      }
      resetData();
      reset((prev: boolean) => prev);
    } else {
      ToastAndroid.show('Fail', ToastAndroid.LONG);
    }
  };
  const openAddImageModal = (location: number) => {
    const height = Dimensions.get('window').height;
    if (location + 30 > height) location -= 50;
    if (Platform.OS === 'android') {
      setOpenLocation(location);
      setChildrenModalVisible(indexMultiModal.addImageModal);
    } else if (Platform.OS === 'ios') {
      setOpenLocation(location);
      setVisible(indexModal.closeModal);
      setChildrenModalVisible(indexMultiModal.addImageModal);
      setVisible(indexModal.detailModal);
    }
  };
  return (
    <MyModal
      visible={visible === indexModal.editDetailModal ? true : false}
      setVisible={setVisible}
      headerTitle="Detail"
      headerLeft={headerLeft}
      headerRight={headerRight}
      disableRight={!isFilled}
      handlerHeaderLeft={() => setVisible(indexModal.closeModal)}
      handlerHeaderRight={handlerRight}>
      <KeyboardAvoidingView
        style={{width: '100%', height: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={[styles.container, {marginBottom: onkeyboard}]}
          ref={scrollViewRef}>
          <RadiusView style={styles.item}>
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
            <Line width={86} />
            <TextInputApp
              style={{paddingHorizontal: 5}}
              value={data.url ?? ''}
              onChange={onChangeURL}
              placeholder="URL"
            />
          </RadiusView>
          <RadiusView style={styles.item}>
            <SwitchView
              isActive={isDatePickerEnable}
              SetIsAvtive={setDatePickerEnable}
              title="Date"
              subtitle={
                date.getDate() === currentDate.getDate() &&
                date.getMonth() === currentDate.getMonth() &&
                date.getFullYear() === currentDate.getFullYear()
                  ? 'today'
                  : date.toDateString()
              }
              icon={icon.calendar}
              iconColor={colors.red}
            />
            <Line width={83} />
            {isDatePickerEnable && !isTimePickerEnable && (
              <View>
                <CalendarView setDate={setDate} />
                <Line width={95} />
              </View>
            )}
            <SwitchView
              isActive={isTimePickerEnable}
              SetIsAvtive={setTimePickerEnable}
              title="Time"
              icon={icon.time}
              iconColor={colors.darkBlue}
              subtitle={
                date.getHours() +
                ':' +
                (date.getMinutes() < 10
                  ? '0' + date.getMinutes()
                  : date.getMinutes())
              }
            />
            {isTimePickerEnable && (
              <View>
                <Line width={83} />
                <DatePicker
                  mode="time"
                  date={date}
                  onDateChange={newTime => {
                    setDate(
                      prevDate =>
                        new Date(prevDate.setHours(newTime.getHours())),
                    );
                    setDate(
                      prevDate =>
                        new Date(prevDate.setMinutes(newTime.getMinutes())),
                    );
                    setData((prevData: ReminderDataType) => {
                      prevData.dateTime = date.getTime();
                      return prevData;
                    });
                  }}
                  style={{alignSelf: 'center'}}
                  is24hourSource="locale"
                />
              </View>
            )}
          </RadiusView>
          <RadiusView style={styles.item}>
            <ChevronView
              title="Tag"
              iconColor={colors.gray02}
              iconName={icon.tag}
              iconShown={true}
            />
          </RadiusView>
          <RadiusView style={styles.item}>
            <SwitchView
              isActive={isLocationEnable}
              SetIsAvtive={setIsLocationEnable}
              title="Location"
              icon={icon.navigate}
              iconColor={colors.darkBlue}
            />
          </RadiusView>
          <RadiusView style={styles.item}>
            <SwitchView
              isActive={isMessagingEnable}
              SetIsAvtive={setIsMessagingEnable}
              title="When Messaging"
              icon={icon.chatbubble}
              iconColor={colors.green}
            />
          </RadiusView>
          <Text style={{color: colors.gray, padding: 10}}>
            Selecting this option will show the reminder notification when
            chatting with person in Messages.
          </Text>
          <RadiusView style={styles.item}>
            <SwitchView
              isActive={isFlagEnable}
              SetIsAvtive={(value: boolean) => {
                setIsFlagEnable(value);
                setData((prevData: ReminderDataType) => {
                  prevData.flag = true;
                  return prevData;
                });
              }}
              title="Flag"
              icon={icon.flag}
              iconColor={colors.orange_dark}
            />
          </RadiusView>
          <RadiusView style={styles.item}>
            <ChevronView
              title="Priority"
              iconShown={false}
              itemPicked={
                data.priority === 0
                  ? 'None'
                  : data.priority === 1
                  ? 'Low'
                  : data.priority === 2
                  ? 'Medium'
                  : 'High'
              }
              handlerOnPress={() => setVisible(indexModal.priorityModal)}
            />
          </RadiusView>
          <RadiusView style={styles.item}>
            <ChevronView
              title="Reapeat"
              iconShown={false}
              itemPicked={reminderItem?.repeat}
              handlerOnPress={() => setVisible(indexModal.repeatModal)}
            />
          </RadiusView>
          <RadiusView style={styles.item}>
            <ChevronView
              title="Sound"
              iconShown={false}
              itemPicked={sound}
              handlerOnPress={() => setVisible(indexModal.soundPickerModal)}
            />
          </RadiusView>
          <RadiusView
            style={[styles.row, styles.centerHorizontal, styles.item]}>
            <PaddingView style={{width: '100%'}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={(evt: GestureResponderEvent) => {
                  console.log(data);
                  openAddImageModal(Math.floor(evt.nativeEvent.pageY));
                }}>
                <Text style={[styles.text, {color: colors.blue, flexGrow: 1}]}>
                  Add Image
                </Text>
                {data.image != 'none' && (
                  <Image
                    key={data.image}
                    style={{height: 50, width: 50}}
                    source={{uri: data.image}}
                  />
                )}
              </TouchableOpacity>
            </PaddingView>
          </RadiusView>
          <View style={styles.item}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginBottom: 38,
  },
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
  row: {
    flexDirection: 'row',
  },
  centerVertical: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  item: {
    marginTop: 20,
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
