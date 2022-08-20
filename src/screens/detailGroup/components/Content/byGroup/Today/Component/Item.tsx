import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ReminderDataType} from 'utils/types/rootTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from 'redux/hook';
import {
  ReminderState,
  updateCompleted,
} from 'redux/reducer/reminder/reminderSlice';
import {reminderAPI} from 'utils/api/reminderAPI';
import {checkTime, timeToString, timeToTimeString} from 'utils/common/time';
import {checkCompleted} from 'utils/common/checkCompleted';

export const ItemToday = ({
  item,
  onDetailPressed,
  onFlagPressed,
  onDeletePressed,
  reset,
}: {
  item: ReminderDataType;
  onDetailPressed?: Function;
  onFlagPressed?: Function;
  onDeletePressed?: Function;
  reset: Function;
}) => {
  const [isCompleted, setCompleted] = useState(
    checkCompleted(item.dateTime)
  );
  const [name, setName] = useState(item.name);
  const reminder = useAppSelector(state => state.reminder.reminder);
  const dispatch = useAppDispatch();
  const reminderItem = reminder.find(value => value.id === item.id);

  const list = useAppSelector(state => state.list.list);

  const renderRightAction = () => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.gray05}]}
          onPress={() => {
            if (onDetailPressed) onDetailPressed();
          }}>
          <Text style={styles.swipeButton}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.orange_dark}]}
          onPress={() => {
            if (onFlagPressed) onFlagPressed();
          }}>
          <Text style={styles.swipeButton}>Flag</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.red}]}
          onPress={() => {
            if (onDeletePressed) onDeletePressed();
          }}>
          <Text style={styles.swipeButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{marginLeft: 20}}>
      <Swipeable renderRightActions={renderRightAction} rightThreshold={50}>
        <View
          style={[
            styles.row,
            styles.centerHorizontal,
            {
              paddingVertical: 13,
              paddingRight: 20,
              backgroundColor: colors.white,
            },
          ]}>
          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={() => {
              setCompleted(!isCompleted);
              dispatch(
                updateCompleted({id: item.id ? item.id : '', complete: true}),
              );
              reset((prev: boolean) => !prev);
            }}
            disabled={isCompleted || reminderItem?.completed}>
            <View
              style={{
                borderRadius: 20,
                borderColor:
                  isCompleted || reminderItem?.completed
                    ? colors.blue
                    : colors.gray02,
                borderWidth: 1,
                minHeight: 25,
                minWidth: 25,
                padding: 2,
              }}>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    isCompleted || reminderItem?.completed
                      ? colors.blue
                      : colors.white,
                  flex: 1,
                }}></View>
            </View>
          </TouchableOpacity>
          <View style={{flexGrow: 1}}>
            <View style={[styles.row, styles.centerHorizontal]}>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: fontSize.regular,
                  marginLeft: 10,
                }}>
                {item.priority === 1
                  ? '!'
                  : item.priority === 2
                  ? '!!'
                  : item.priority === 3
                  ? '!!!'
                  : ''}
              </Text>
              <TextInput
                value={name}
                style={{
                  color: colors.black,
                  fontSize: fontSize.regular,
                  fontWeight: fontWeights.w400,
                  flexGrow: 1,
                  height: 24.5,
                  padding: 0,
                  maxWidth: 250,
                }}
                onChangeText={setName}
                onEndEditing={async () => {
                  const res = await reminderAPI.updateName(
                    item.listId,
                    item.id ?? '',
                    name,
                  );
                }}
              />
            </View>
            <View style={{marginLeft: 10}}>
              {item.notes != '' && (
                <Text
                  style={{
                    color: colors.gray02,
                    fontSize: fontSize.small,
                    fontWeight: fontWeights.w400,
                  }}>
                  {item.notes}
                </Text>
              )}
              <Text
                style={{
                  color: colors.gray02,
                  fontSize: fontSize.small,
                  fontWeight: fontWeights.w400,
                }}>
                {`${
                  list.find((value, index) => value.id === item.listId)?.name
                }${checkTime(item.dateTime)}`}
              </Text>
              {item.image != 'none' && (
                <Image
                  key={item.id}
                  style={{height: 35, width: 35, marginRight: 7}}
                  source={{uri: item.image}}
                />
              )}
            </View>
          </View>
          {item.flag && (
            <Ionicons
              name={icon.flag}
              color={colors.orange_dark}
              size={20}
              style={{alignSelf: 'flex-start'}}
            />
          )}
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
  swipeButton: {
    color: colors.white,
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
    textAlign: 'center',
  },
  button: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
  },
});
