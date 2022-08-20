import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {AddReminderModal, DetailModal} from 'components';
import {CONSTANTS} from 'utils/constants';
import {ReminderDataType, RepeatType} from 'utils/types/rootTypes';
import {PriorityModal} from 'components/modal/PriorityModal';
import {AddImageModal} from 'components/modal/addImageModal';
import {AddListModal} from 'components/modal/addListModal';
import {ChoseListModal} from 'components/modal/choseListMocal';
import {RepeatModal} from 'components/modal/repeatModal';
import { SoundPickerModal } from 'components/modal/soundPickerModal';

export const Footer = ({listId}: {listId: string}) => {
  const [indexModalVisible, setIndexModalVisible] = useState(0);
  const [indexMutilModalVisible, setindexMutilModalVisible] = useState(0);
  const [data, setData] = useState<ReminderDataType>({
    createAt: new Date().getTime(),
    dateTime: 0,
    flag: false,
    listId: listId,
    name: '',
    notes: '',
    location: 'none',
    tag: 'none',
    priority: 0,
    image: 'none',
    url: ''
  });
  const [locationOpenAddImageModal, setLocationOpenAddImageModal] = useState(0);
  const [repeat, setRepeat] = useState<RepeatType>('Never');
  const [sound, setSound] = useState('default')

  const indexModal = CONSTANTS.indexModal;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          setIndexModalVisible(indexModal.addReminderModal);
        }}>
        <Ionicons name={icon.add_circle} size={30} color={colors.blue} />
        <View style={styles.textWrapper}>
          <Text style={[styles.text, {fontWeight: fontWeights.w600}]}>
            New Reminder
          </Text>
        </View>
      </TouchableOpacity>
      <AddReminderModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        data={data}
        setData={setData}
        repeat={repeat}
      />
      <DetailModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        data={data}
        setData={setData}
        setChildrenModalVisible={setindexMutilModalVisible}
        setOpenLocation={setLocationOpenAddImageModal}
        repeat={repeat}
        sound={sound}
      />
      <PriorityModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        data={data}
        setData={setData}
      />
      <AddImageModal
        visible={indexMutilModalVisible}
        setVisible={setindexMutilModalVisible}
        setData={setData}
        location={locationOpenAddImageModal}
      />
      <AddListModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
      />
      <ChoseListModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        data={data}
        setData={setData}
      />
      <RepeatModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        repeat={repeat}
        setRepeat={setRepeat}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  textWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
  },
  text: {
    fontSize: fontSize.regular,
    color: colors.blue,
  },
});
