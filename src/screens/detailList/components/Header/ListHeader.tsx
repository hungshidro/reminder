import React, {useState} from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {icon} from 'utils/icons/icons';
import {fontWeights} from 'utils/sizings';
import {navigate, goBack} from 'navigation/service';
import {Line, PaddingView, RadiusView} from 'components';
import {listAPI} from 'utils/api/listAPI';
import {useAppDispatch} from 'redux/hook';
import {deleteList} from 'redux/reducer/list/listSlice';
import {reminderAPI} from 'utils/api/reminderAPI';
import {ReminderDataType} from 'utils/types/rootTypes';
import { deleteReminder } from 'redux/reducer/reminder/reminderSlice';

export const ListHeader = ({
  isHide,
  setIsHide,
  sortBy,
  setSortBy,
  listId,
}: {
  isHide: boolean;
  setIsHide: Function;
  sortBy: 'manual' | 'dateTime' | 'priority';
  setSortBy: Function;
  listId: string;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showSortPicker, setShowSortPicker] = useState(false);

  const dispatch = useAppDispatch();

  const deleteCurrentList = async () => {
    const listData = await reminderAPI.getAllReminder(listId, 'manual');
      console.log('deleteData: ')
      console.log(listData)
      if (listData) {
        listData.forEach(async (value: ReminderDataType) => {
          await reminderAPI.deleteReminder(listId, value.id ?? '');
          dispatch(deleteReminder({id: value.id??''}))
        });
    const res = await listAPI.deleteList(listId);
    if (res) {
      dispatch(deleteList({listId: listId}));
      }
      goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <View style={[styles.row, styles.centerHorizontal]}>
            <Ionicons name={icon.chevron_back} color={colors.blue} size={28} />
            <Text
              style={{
                color: colors.blue,
                fontSize: fontSize.regular,
                fontWeight: fontWeights.w400,
              }}>
              Lists
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Ionicons
            name={icon.ellipsis_horizontal_circle}
            color={colors.blue}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        transparent={true}
        statusBarTranslucent={true}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.03)',
          }}
          onPress={() => setModalVisible(!modalVisible)}
          activeOpacity={1}>
          <RadiusView
            style={{
              alignSelf: 'flex-end',
              marginTop: 80,
              marginRight: 10,
              minWidth: '70%',
            }}>
            <TouchableOpacity>
              <PaddingView
                style={[styles.row, styles.centerHorizontal, {marginLeft: 19}]}>
                <Text style={styles.modalText}>Show List Info</Text>
                <Ionicons name={icon.pencil} color={colors.black} size={15} />
              </PaddingView>
            </TouchableOpacity>
            <Line width={100} />
            <TouchableOpacity
              style={{borderTopWidth: 1, borderTopColor: colors.gray06}}>
              <PaddingView
                style={[styles.row, styles.centerHorizontal, {marginLeft: 19}]}>
                <Text style={styles.modalText}>Share List</Text>
                <Ionicons
                  name={icon.person_add}
                  color={colors.black}
                  size={20}
                />
              </PaddingView>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderTopWidth: 1, borderTopColor: colors.gray06}}>
              <PaddingView
                style={[styles.row, styles.centerHorizontal, {marginLeft: 19}]}>
                <Text style={styles.modalText}>Select Reminder</Text>
                <Ionicons
                  name={icon.checkmark_circle_outline}
                  color={colors.black}
                  size={20}
                />
              </PaddingView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowSortPicker(!showSortPicker)}
              style={{borderTopWidth: 1, borderTopColor: colors.gray06}}>
              <PaddingView style={[styles.row, styles.centerHorizontal]}>
                <Ionicons
                  name={
                    showSortPicker ? icon.chevron_down : icon.chevron_foward
                  }
                  color={colors.black}
                  size={20}
                  style={{alignSelf: 'flex-start'}}
                />
                <View style={{flexGrow: 1}}>
                  <Text style={styles.modalText}>Sort By</Text>
                  {!showSortPicker && (
                    <Text
                      style={[
                        styles.modalText,
                        {color: colors.gray02, fontSize: fontSize.small},
                      ]}>
                      {sortBy === 'manual'
                        ? 'Manual'
                        : sortBy === 'dateTime'
                        ? 'Date time'
                        : 'Priority'}
                    </Text>
                  )}
                </View>
                <Ionicons
                  name={icon.swap_vertical}
                  color={colors.black}
                  size={20}
                  style={{alignSelf: 'flex-start'}}
                />
              </PaddingView>
            </TouchableOpacity>
            {showSortPicker && (
              <View>
                <TouchableOpacity onPress={() => setSortBy('manual')}>
                  <Text
                    style={{
                      color: sortBy === 'manual' ? colors.black : colors.gray02,
                      fontSize: fontSize.small,
                      fontWeight: fontWeights.w400,
                      marginLeft: 35,
                      paddingVertical: 7,
                    }}>
                    Manual
                  </Text>
                </TouchableOpacity>
                <Line width={90} />
                <TouchableOpacity onPress={() => setSortBy('dateTime')}>
                  <Text
                    style={{
                      color:
                        sortBy === 'dateTime' ? colors.black : colors.gray02,
                      fontSize: fontSize.small,
                      fontWeight: fontWeights.w400,
                      marginLeft: 35,
                      paddingVertical: 7,
                    }}>
                    Date time
                  </Text>
                </TouchableOpacity>
                <Line width={90} />
                <TouchableOpacity onPress={() => setSortBy('priority')}>
                  <Text
                    style={{
                      color:
                        sortBy === 'priority' ? colors.black : colors.gray02,
                      fontSize: fontSize.small,
                      fontWeight: fontWeights.w400,
                      marginLeft: 35,
                      paddingVertical: 7,
                    }}>
                    Priority
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => setIsHide(!isHide)}
              style={{borderTopWidth: 1, borderTopColor: colors.gray06}}>
              <PaddingView
                style={[styles.row, styles.centerHorizontal, {marginLeft: 19}]}>
                <Text style={styles.modalText}>{isHide ? 'Hide' : 'Show'} Completed</Text>
                <Ionicons
                  name={isHide ? icon.eye_off_outline : icon.eye_outline}
                  color={colors.black}
                  size={20}
                />
              </PaddingView>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderTopWidth: 1, borderTopColor: colors.gray06}}>
              <PaddingView
                style={[styles.row, styles.centerHorizontal, {marginLeft: 19}]}>
                <Text style={styles.modalText}>Print</Text>
                <Ionicons
                  name={icon.print_outline}
                  color={colors.black}
                  size={20}
                />
              </PaddingView>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderTopWidth: 1, borderTopColor: colors.gray06}}
              onPress={() => deleteCurrentList()}>
              <PaddingView
                style={[styles.row, styles.centerHorizontal, {marginLeft: 19}]}>
                <Text style={[styles.modalText, {color: colors.red}]}>
                  Delete
                </Text>
                <Ionicons
                  name={icon.trash_outline}
                  color={colors.red}
                  size={20}
                />
              </PaddingView>
            </TouchableOpacity>
          </RadiusView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 10,
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
  modalText: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
    color: colors.black,
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 15,
  },
});
