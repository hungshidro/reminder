import React, {Fragment} from 'react';
import {Text, View} from 'react-native';
import {NestableScrollContainer} from 'react-native-draggable-flatlist';
import colors from 'utils/colors';
import { fontSize } from 'utils/fontsize';
import { fontWeights } from 'utils/sizings';
import { DragableList } from './component/DragableList/DragableList';
import {EditGroup} from './list/listViewGroup/EditGroup';

export const Content = () => {
  return (
    <Fragment>
      <EditGroup/>
      <View style={{margin: 10}}>
        <Text
          style={{
            fontSize: fontSize.big,
            color: colors.black,
            fontWeight: fontWeights.w600,
          }}>
          My Lists
        </Text>
      </View>
    </Fragment>
  );
};
