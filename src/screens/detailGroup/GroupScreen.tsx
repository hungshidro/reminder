import {GroupProps} from 'navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {AllListView} from './components/Content/byGroup/AllList/AllList';
import {FlagedGroup} from './components/Content/byGroup/Flaged/FlagedGroup';
import {ScheduleGroup} from './components/Content/byGroup/Scheduled/ScheduleGroup';
import {TodayGroup} from './components/Content/byGroup/Today/TodayGroup';
import {Header} from './components/Header/Header';

const GroupScreen = ({route}: GroupProps) => {
  const {groupName, color} = route.params;
  const [isHide, setIsHide] = useState(true);
  const [sortBy, setSortBy] = useState<'manual' | 'dateTime' | 'priority'>(
    'manual',
  );

  return (
    <View style={styles.container}>
      <Header
        isHide={isHide}
        setIsHide={setIsHide}
        sortBy={sortBy}
        setSortBy={setSortBy}
        groupName={groupName}
      />
      <Text
        style={[
          styles.listName,
          {paddingLeft: 20, color: color, marginBottom: 10},
        ]}>
        {groupName}
      </Text>
      {groupName === 'All' ? (
        <AllListView isHide={isHide} sortBy={sortBy} />
      ) : groupName === 'Today' ? (
        <TodayGroup isHide={isHide} sortBy={sortBy} />
      ) : groupName === 'Flagged' ? (
        <FlagedGroup isHide={isHide} sortBy={sortBy} />
      ) : (
        <ScheduleGroup isHide={isHide} sortBy={sortBy} />
      )}
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

export default GroupScreen;
