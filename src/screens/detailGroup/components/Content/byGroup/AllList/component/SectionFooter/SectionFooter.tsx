import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from 'redux/hook';
import { incrementCount } from 'redux/reducer/list/listSlice';
import { addNewReminder } from 'redux/reducer/reminder/reminderSlice';
import { listAPI } from 'utils/api/listAPI';
import {reminderAPI} from 'utils/api/reminderAPI';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {icon} from 'utils/icons/icons';
import {fontWeights} from 'utils/sizings';

export const FooterSection = ({
  listId,
  reset,
}: {
  listId: string;
  reset: Function;
}) => {
  const [newRemindername, setNewReminderName] = useState('');

  const dispatch = useAppDispatch()
  return (
    <View
      style={[
        styles.row,
        styles.centerHorizontal,
        {marginLeft: 17, marginVertical: 5},
      ]}>
      <TouchableOpacity>
        <Ionicons name={icon.add_circle} size={30} color={colors.gray03} />
      </TouchableOpacity>
      <TextInput
        value={newRemindername}
        onChangeText={setNewReminderName}
        onEndEditing={async () => {
          if (newRemindername != '') {
            const res = await reminderAPI.addNewReminder(listId, {
              createAt: new Date().getTime(),
              dateTime: 0,
              flag: false,
              listId: listId,
              name: newRemindername,
              notes: '',
              priority: 0,
              image: 'none',
              isMessaging: false,
              location: 'none',
              tag: 'none',
              url: '',
            });
            if (res) {
              const updateCountRes = await listAPI.updateListCountUp(
                listId,
              );
              console.log(res);
              dispatch(incrementCount({listId: listId}));
              dispatch(
                addNewReminder({
                  id: res.data.id,
                  name: newRemindername,
                  notificationID: res.data.id,
                  completed: false,
                  repeat: 'Never',
                  flag: false,
                }),
              );
            }
          }
          reset((prev: boolean) => !prev);
          setNewReminderName('');
        }}
        style={[styles.footerInput]}
        selectionColor={colors.blue}
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
