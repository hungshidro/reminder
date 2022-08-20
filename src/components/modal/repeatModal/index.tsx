import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'utils/colors';
import {CONSTANTS} from 'utils/constants';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {MyModal} from '../modalBase/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import {RadiusView} from 'components/view/RadiusView';
import {PaddingView} from 'components/view/PaddingView';
import {Line} from 'components/line/Line';
import {RepeatType} from 'utils/types/rootTypes';
import {Item} from './Item';

export const RepeatModal = ({
  visible,
  setVisible,
  repeat,
  setRepeat,
}: {
  visible: number;
  setVisible: Function;
  repeat: RepeatType;
  setRepeat: Function;
}) => {
  const indexModal = CONSTANTS.indexModal;
  const repeatData: RepeatType[] = [
    'Never',
    'Hourly',
    'Daily',
    'Weekdays',
    'Weekends',
    'Weekly',
    'Monthly',
    'Every 3 Month',
    'Every 6 Month',
  ];

  const headerLeft = (
    <View style={[styles.row, styles.centerHorizontal]}>
      <Ionicons name={icon.chevron_back} size={24} color={colors.blue} />
      <Text style={[styles.text, {color: colors.blue}]}>Details</Text>
    </View>
  );
  return (
    <MyModal
      visible={visible === indexModal.repeatModal ? true : false}
      setVisible={setVisible}
      headerTitle="Repeat"
      headerLeft={headerLeft}
      handlerHeaderLeft={() => setVisible(indexModal.detailModal)}
      previousModal={indexModal.detailModal}>
      <RadiusView style={styles.container}>
        {repeatData.map((value, index, array) => (
          <View key={value}>
            <PaddingView>
              <TouchableOpacity
                style={[styles.row, styles.centerHorizontal]}
                onPress={() => setRepeat(value)}>
                <View
                  style={[
                    styles.row,
                    {justifyContent: 'space-between', width: '100%'},
                  ]}>
                  <Text style={[styles.text, {color: colors.black}]}>
                    {value}
                  </Text>
                  {value === repeat && (
                    <Ionicons
                      name={icon.checkmark}
                      color={colors.blue}
                      size={22}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </PaddingView>
            {index < array.length -1 && <Line width={95} />}
          </View>
        ))}
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
