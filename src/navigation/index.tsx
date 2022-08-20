import React, {useCallback, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './stack';
import {navigationRef} from './service';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { clearReminder } from 'redux/reducer/reminder/reminderSlice';
import { clearList } from 'redux/reducer/list/listSlice';
import { clearGroup, initGroup } from 'redux/reducer/group/groupSlice';
import { icon } from 'utils/icons/icons';
import colors from 'utils/colors';

const AppNavigator = () => {

  const dispatch = useAppDispatch()
  // dispatch(clearReminder())
  // dispatch(clearList())
  // dispatch(clearGroup())
  // const reminder = useAppSelector(state=>state.reminder.reminder)
  // const group = useAppSelector(state=>state.group.group)
  // const list = useAppSelector(state=>state.list.list)
  // console.log(reminder)
  // console.log(group)
  // console.log(list)
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
