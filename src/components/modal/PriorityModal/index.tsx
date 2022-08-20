import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'utils/colors';
import {CONSTANTS} from 'utils/constants';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ReminderDataType} from 'utils/types/rootTypes';
import {MyModal} from '../modalBase/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import {RadiusView} from 'components/view/RadiusView';
import {PaddingView} from 'components/view/PaddingView';
import {Line} from 'components/line/Line';

export const PriorityModal = ({
  data,
  setData,
  visible,
  setVisible,
}: {
  data: ReminderDataType;
  setData: Function;
  visible: number;
  setVisible: Function;
}) => {
    const [priority, setPriotity] = useState(data.priority)

  const indexModal = CONSTANTS.indexModal;

  const headerLeft = (
    <View style={[styles.row, styles.centerHorizontal]}>
      <Ionicons name={icon.chevron_back} size={24} color={colors.blue} />
      <Text style={[styles.text, {color: colors.blue}]}>New Reminder</Text>
    </View>
  );
  return (
    <MyModal
      visible={visible === indexModal.priorityModal ? true : false}
      setVisible={setVisible}
      headerTitle="Priority"
      headerLeft={headerLeft}
      handlerHeaderLeft={() => setVisible(indexModal.detailModal)}
      previousModal={indexModal.detailModal}>
      <RadiusView style={styles.container}>
        <PaddingView>
          <TouchableOpacity
            style={[styles.row, styles.centerHorizontal]}
            onPress={() => {
              setData((prevData: ReminderDataType) => {
                prevData.priority = 0;
                return prevData;
              });
              setPriotity(0)
            }}>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', width: '100%'},
              ]}>
              <Text style={[styles.text, {color: colors.black}]}>None</Text>
              {priority === 0 && (
                <Ionicons name={icon.checkmark} color={colors.blue} size={22} />
              )}
            </View>
          </TouchableOpacity>
        </PaddingView>
        <Line style={{backgroundColor: colors.gray03}} width={100} />
        <PaddingView>
          <TouchableOpacity
            style={[styles.row, styles.centerHorizontal]}
            onPress={() => {
              setData((prevData: ReminderDataType) => {
                prevData.priority = 1;
                return prevData;
              });
              setPriotity(1)
            }}>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', width: '100%'},
              ]}>
              <Text style={[styles.text, {color: colors.black}]}>Low</Text>
              {priority === 1 && (
                <Ionicons name={icon.checkmark} color={colors.blue} size={22} />
              )}
            </View>
          </TouchableOpacity>
        </PaddingView>
        <Line width={95} />
        <PaddingView>
          <TouchableOpacity
            style={[styles.row, styles.centerHorizontal]}
            onPress={() => {
              setData((prevData: ReminderDataType) => {
                prevData.priority = 2;
                return prevData;
              });
              setPriotity(2)
            }}>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', width: '100%'},
              ]}>
              <Text style={[styles.text, {color: colors.black}]}>Medium</Text>
              {priority === 2 && (
                <Ionicons name={icon.checkmark} color={colors.blue} size={22} />
              )}
            </View>
          </TouchableOpacity>
        </PaddingView>
        <Line width={95} />
        <PaddingView>
          <TouchableOpacity
            style={[styles.row, styles.centerHorizontal]}
            onPress={() => {
              setData((prevData: ReminderDataType) => {
                prevData.priority = 3;
                return prevData;
              });
              setPriotity(3)
            }}>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', width: '100%'},
              ]}>
              <Text style={[styles.text, {color: colors.black}]}>High</Text>
              {priority === 3 && (
                <Ionicons name={icon.checkmark} color={colors.blue} size={22} />
              )}
            </View>
          </TouchableOpacity>
        </PaddingView>
      </RadiusView>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 38,
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
