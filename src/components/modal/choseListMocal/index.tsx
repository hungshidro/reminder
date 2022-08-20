import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CONSTANTS} from 'utils/constants';
import {MyModal} from '../modalBase/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ListType, ReminderDataType} from 'utils/types/rootTypes';
import {listAPI} from 'utils/api/listAPI';
import {RadiusView} from 'components/view/RadiusView';
import {PaddingView} from 'components/view/PaddingView';
import {Line} from 'components/line/Line';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import { useAppSelector } from 'redux/hook';

export const ChoseListModal = ({
  visible,
  setVisible,
  data,
  setData,
}: {
  visible: number;
  setVisible: Function;
  data: ReminderDataType;
  setData: Function;
}) => {
  const [listData, setlistData] = useState<ListType[]>([]);
  const [selectedList, setSelectedList] = useState(data.listId);
  const list = useAppSelector(state=> state.list.list)

  const feftchData = useCallback(async () => {
    const res = await listAPI.getAllList();
    setlistData(res);
  }, [list]);

  useEffect(() => {
    feftchData();
  }, [list]);
  const indexModal = CONSTANTS.indexModal;

  const headerLeft = (
    <View style={[styles.row, styles.centerHorizontal]}>
      <Ionicons name={icon.chevron_back} size={24} color={colors.blue} />
      <Text style={[styles.text, {color: colors.blue}]}>New Reminder</Text>
    </View>
  );
  return (
    <MyModal
      visible={visible === indexModal.choseListModal}
      setVisible={setVisible}
      headerTitle="List"
      previousModal={indexModal.addReminderModal}
      headerLeft={headerLeft}
      handlerHeaderLeft={() => setVisible(indexModal.addReminderModal)}>
      <RadiusView style={{marginTop: 30}}>
        {listData.map((item, index, array) => {
          return (
            <View key={item.id}>
              <PaddingView style={[styles.container]}>
                <TouchableOpacity
                  onPress={() => {
                    setData((prevData: ReminderDataType) => {
                      if (item.id) prevData.listId = item.id;
                      return prevData;
                    });
                    if (item.id) setSelectedList(item.id);
                  }}>
                  <View
                    style={[
                      styles.row,
                      {
                        justifyContent: 'space-between',
                        width: '100%',
                      },
                    ]}>
                    <View style={styles.titleContainer}>
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={colors.white}
                        style={{
                          backgroundColor: item.color,
                          padding: 5,
                          borderRadius: 9,
                          marginRight: 15,
                        }}
                      />
                      <Text style={[styles.titleText]}>{item.name}</Text>
                    </View>
                    {selectedList != item.id ? (
                      <Text style={[styles.text, {color: colors.gray02}]}>
                        {item.count}
                      </Text>
                    ) : (
                      <Ionicons
                        name={icon.checkmark}
                        color={colors.blue}
                        size={22}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </PaddingView>
              {index < array.length - 1 && <Line width={90} />}
            </View>
          );
        })}
      </RadiusView>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    justifyContent: 'center',
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
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
    color: colors.black,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
