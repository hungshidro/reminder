import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {MyModal} from '../modalBase/Modal';
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
import {pushAndroidLocalNotificationSchedule} from 'utils/notification';
import {reminderAPI} from 'utils/api/reminderAPI';
import {listAPI} from 'utils/api/listAPI';
import {useAppDispatch} from 'redux/hook';
import {incrementCount} from 'redux/reducer/list/listSlice';
import {addNewReminder} from 'redux/reducer/reminder/reminderSlice';
import {timeToString} from 'utils/common/time';
import {usesAutoDateAndTime} from 'react-native-localize';
export const DetailModal = ({
  visible,
  setVisible,
  data,
  setData,
  setChildrenModalVisible,
  setOpenLocation,
  repeat,
  sound,
}: {
  visible: number;
  setVisible: Function;
  data: ReminderDataType;
  setData: Function;
  setChildrenModalVisible: Function;
  setOpenLocation: Function;
  repeat: RepeatType;
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.name != '') setIsFilled(true);
    else setIsFilled(false);
  }, [data.name]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setOnkeyboard(70);
      scrollViewRef.current?.scrollToEnd();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setOnkeyboard(38);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    setIsFlagEnable(data.flag);
  });

  const indexModal = CONSTANTS.indexModal;
  const indexMultiModal = CONSTANTS.indexMutilModal;
  const currentDate = new Date(Date.now());

  const reset = () => {
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
    setDatePickerEnable(false);
    setIsFlagEnable(false);
    setIsLocationEnable(false);
    setIsMessagingEnable(false);
    setTimePickerEnable(false);
    setDate(new Date());
  };
  const headerLeft = (
    <View style={[styles.row, styles.centerHorizontal]}>
      <Ionicons name={icon.chevron_back} size={24} color={colors.blue} />
      <Text style={[styles.text, {color: colors.blue}]}>New Reminder</Text>
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
      Add
    </Text>
  );
  const handlerRight = async () => {
    setDate(prevDate => new Date(prevDate.setSeconds(0)));
    const newDate = new Date(date.getTime());
    if (!isTimePickerEnable) {
      newDate.setMinutes(0);
      newDate.setHours(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      setData((prev: ReminderDataType) => {
        prev.dateTime = newDate.getTime();
        return prev;
      });
    } else if (date.getTime() > Date.now()) {
      setData((prev: ReminderDataType) => {
        prev.dateTime = date.getTime();
        return prev;
      });
    }
    const res = await reminderAPI.addNewReminder(data.listId, data);
    if (res) {
      setVisible(indexModal.closeModal);
      ToastAndroid.show('Success', ToastAndroid.LONG);
      const updateCountRes = await listAPI.updateListCountUp(data.listId);
      dispatch(incrementCount({listId: data.listId}));
      dispatch(
        addNewReminder({
          id: res.data.id,
          name: res.data.name,
          notificationID: res.data.id,
          completed: false,
          repeat: repeat,
          flag: data.flag,
          sound: sound,
          dateTime: data.dateTime,
          priority: data.priority,
          listId: data.listId,
          notes: data.notes,
          image: data.image
        }),
      );
      if (
        Date.now() < data.dateTime &&
        newDate.getHours() != 0 &&
        newDate.getMinutes() != 0 &&
        newDate.getSeconds() != 0 &&
        newDate.getMilliseconds() != 0
      ) {
        pushAndroidLocalNotificationSchedule({
          date: date,
          message: 'Notification',
          title: 'Title',
          smallIcon: '',
          repeat: repeat,
          id: res.data.id,
          sound: sound,
        });
      }
      reset();
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
      visible={visible === indexModal.detailModal ? true : false}
      setVisible={setVisible}
      headerTitle="Detail"
      headerLeft={headerLeft}
      headerRight={headerRight}
      previousModal={indexModal.addReminderModal}
      disableRight={!isFilled}
      handlerHeaderLeft={() => setVisible(indexModal.addReminderModal)}
      handlerHeaderRight={handlerRight}>
      <KeyboardAvoidingView
        style={{width: '100%', height: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={[styles.container, {marginBottom: onkeyboard}]}
          ref={scrollViewRef}>
          <RadiusView style={styles.item}>
            <SwitchView
              isActive={isDatePickerEnable}
              SetIsAvtive={setDatePickerEnable}
              title="Date"
              subtitle={
                data.dateTime === 0
                  ? ''
                  : date.getDate() === currentDate.getDate() &&
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
                data.dateTime === 0
                  ? ''
                  : date.getHours() +
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
              itemPicked={repeat}
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
          <RadiusView style={styles.item}>
            <TextInputApp
              onChange={setUrlInput}
              placeholder="URL"
              value={urlInput}
            />
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
