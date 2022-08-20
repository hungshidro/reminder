import {Line} from 'components';
import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {ScrollView,Text, ViewStyle} from 'react-native';
import {GroupState,} from 'redux/reducer/group/groupSlice';
import {ListState} from 'redux/reducer/list/listSlice';
import {DragableItem} from '../DragableItem/DragableItem';

export const DragableList = ({
  list,
  renderItem,
  contentContainerStyle,
  style,
}: {
  list: GroupState[] | ListState[];
  renderItem: (item: GroupState | ListState) => ReactElement | null | ReactNode;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
}) => {
    const toNumber = (str: string) => {
        return (str as unknown) as number
    }
  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      style={style}
      scrollEventThrottle={16}
      >
      {list ?list.map((value, index, arr) => (
        <Fragment key={`${value.id}`}>
          <DragableItem
            render={renderItem(value)}
            top={(value.id as unknown) as number}
          />
        </Fragment>
      )):<Text>Empty</Text>}
    </ScrollView>
  );
};
