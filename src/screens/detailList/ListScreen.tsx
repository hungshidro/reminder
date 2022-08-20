import { ListProps } from 'navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {Content} from './components/Content/Content';
import { Footer } from './components/Footer/Footer';
import {ListHeader} from './components/Header/ListHeader';

const ListScreen = ({
  route,
}:ListProps) => {
  const {listName, listId} = route.params;
  const [isHide, setIsHide] = useState(true);
  const [sortBy, setSortBy] = useState<'manual' | 'dateTime' | 'priority'>(
    'manual',
  );

  return (
    <View style={styles.container}>
      <ListHeader
        isHide={isHide}
        setIsHide={setIsHide}
        sortBy={sortBy}
        setSortBy={setSortBy}
        listId={listId}
      />
      <Text style={[styles.listName, {paddingLeft: 20}]}>{listName}</Text>
      <Content listId={listId} isHide={isHide} sortBy={sortBy} />
      <Footer listId={listId}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  listName: {
    color: colors.blue,
    fontSize: fontSize.big,
    fontWeight: fontWeights.w700,
  },
});

export default ListScreen;
