import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ItemType} from '../Section/ItemList';
import {FlatItem} from './ItemMyList';
import React, { useCallback, useEffect, useState } from 'react';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';
import { Line } from 'components';
import { ListType } from 'utils/types/rootTypes';
import { reminderAPI } from 'utils/api/reminderAPI';
import { listAPI } from 'utils/api/listAPI';
import { navigate } from 'navigation/service';
import screenNames from 'utils/screenName';
import { useAppSelector } from 'redux/hook';

export const MyList = () => {
  const [listData, setlistData] = useState<ListType[]>([])
  const list = useAppSelector((state) => state.list)

  const feftchData = useCallback(async () => {
    const res = await listAPI.getAllList();
    setlistData(res)
  }, [list.list]);

  useEffect(() => {
    feftchData();
  },[list.list]);

  const renderItem = ({item}: {item: ListType}) => (
    <FlatItem onPress={() => navigate(screenNames.LIST_SCREEN,{listName: item.name, listId: item.id})} item={item}></FlatItem>
  );
  const ItemSeparator = () => (
    <Line width={86}></Line>
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={{borderRadius: 12, backgroundColor: colors.white, flexGrow: 0}}
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 10,
    flexShrink: 0
  },
});
