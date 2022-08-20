import { AddImageModal } from 'components/modal/addImageModal';
import { ChoseListModal } from 'components/modal/choseListMocal';
import { PriorityModal } from 'components/modal/PriorityModal';
import { RepeatModal } from 'components/modal/repeatModal';
import { SoundPickerModal } from 'components/modal/soundPickerModal';
import React, {useState} from 'react';
import { View } from 'react-native';
import {ReminderDataType, RepeatType} from 'utils/types/rootTypes';
import { EditDetailModal } from '../editDetailModal/EditDetailModal';

export const Detail = ({
  indexModalVisible,
  setIndexModalVisible,
  data,
  setData,
  setReset
}: {
  indexModalVisible: number;
  setIndexModalVisible: Function;
  data: ReminderDataType;
  setData: Function;
  setReset: Function
}) => {
  const [indexMutilModalVisible, setindexMutilModalVisible] = useState(0);
  const [locationOpenAddImageModal, setLocationOpenAddImageModal] = useState(0);
  const [repeat, setRepeat] = useState<RepeatType>('Never');
  const [sound, setSound] = useState('default')
  return (
    <View>
        <EditDetailModal
        data={data}
        repeat={repeat}
        setChildrenModalVisible={setindexMutilModalVisible}
        setData={setData}
        setOpenLocation={setLocationOpenAddImageModal}
        setVisible={setIndexModalVisible}
        visible={indexModalVisible}
        reset={setReset}
        sound={sound}
      />
      <AddImageModal
        location={locationOpenAddImageModal}
        setData={setData}
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
        data={data}
        setData={setData}
      />
      <PriorityModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        data={data}
        setData={setData}
      />
      <SoundPickerModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
        sound={sound}
        setSound={setSound}
      />
    </View>
  )
};
