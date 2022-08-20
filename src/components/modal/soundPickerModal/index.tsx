import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

export const SoundPickerModal = ({
  visible,
  setVisible,
  sound,
  setSound,
}: {
  visible: number;
  setVisible: Function;
  sound: string;
  setSound: Function;
}) => {
  const indexModal = CONSTANTS.indexModal;
  const soundData = [
    {id: '1', soundName: 'default'},
    {id: '2', soundName: 'sound1.mp3'},
    {id: '3', soundName: 'sound2.mp3'},
    {id: '4', soundName: 'sound3.mp3'},
    {id: '5', soundName: 'sound4.mp3'},
    {id: '6', soundName: 'sound5.mp3'},
    {id: '7', soundName: 'sound6.mp3'},
    {id: '8', soundName: 'sound7.mp3'},
    {id: '9', soundName: 'sound8.wav'},
  ];

  const headerLeft = (
    <View style={[styles.row, styles.centerHorizontal]}>
      <Ionicons name={icon.chevron_back} size={24} color={colors.blue} />
      <Text style={[styles.text, {color: colors.blue}]}>New Reminder</Text>
    </View>
  );
  return (
    <MyModal
      visible={visible === indexModal.soundPickerModal ? true : false}
      setVisible={setVisible}
      headerTitle="Sound"
      headerLeft={headerLeft}
      handlerHeaderLeft={() => setVisible(indexModal.detailModal)}
      previousModal={indexModal.detailModal}>
      <RadiusView style={styles.container}>
        <FlatList
          data={soundData}
          renderItem={({item}) => {
            return (
              <View>
                <PaddingView>
                  <TouchableOpacity
                    style={[styles.row, styles.centerHorizontal]}
                    onPress={() => setSound(item.soundName)}>
                    <View
                      style={[
                        styles.row,
                        {justifyContent: 'space-between', width: '100%'},
                      ]}>
                      <Text style={[styles.text, {color: colors.black}]}>
                        {item.soundName}
                      </Text>
                      {sound === item.soundName && (
                        <Ionicons
                          name={icon.checkmark}
                          color={colors.blue}
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </PaddingView>
                <Line width={95}/>
              </View>
            );
          }}
        />
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
