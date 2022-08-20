import React, {Fragment} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {EditScreen, GroupScreen, Home, ListScreen} from 'screens';
import screenNames from 'utils/screenName';
import colors from 'utils/colors';
import {Loading} from 'components';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  HOME_SCREEN: undefined;
  LIST_SCREEN: {listName: string; listId: string};
  GROUP_SCREEN: {groupName: string, color: string}
  EDIT_SCREEN: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type ListScreenRouteProp = RouteProp<RootStackParamList, 'LIST_SCREEN'>;
type GroupScrenRouteProp = RouteProp<RootStackParamList, 'GROUP_SCREEN'>

type ListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LIST_SCREEN'
>;
type GroupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GROUP_SCREEN'>

export type ListProps = {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
};

export type GroupProps = {
  route: GroupScrenRouteProp;
  navigation: GroupScreenNavigationProp;
}

export const RootStack = () => {
  return (
    <Fragment>
      <Stack.Navigator
        initialRouteName="HOME_SCREEN"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.white},
        }}>
        <Stack.Screen name="HOME_SCREEN" component={Home} />
        <Stack.Screen name="LIST_SCREEN" component={ListScreen} />
        <Stack.Screen name='GROUP_SCREEN' component={GroupScreen}/>
        <Stack.Screen name='EDIT_SCREEN' component={EditScreen} />
      </Stack.Navigator>
    </Fragment>
  );
};
