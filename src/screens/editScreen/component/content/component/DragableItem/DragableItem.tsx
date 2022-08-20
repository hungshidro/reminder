import React, {ComponentType, ReactElement, ReactNode, useState} from 'react';
import {View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {runOnJS, useAnimatedGestureHandler, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {ITEM_HEIGHT} from '../ItemList/ItemList';

export const DragableItem = ({
  render,
  top,
}: {
  render: ReactElement | ReactNode;
  top: number;
}) => {
    const [moving, setMoving] = useState(false)

  const gesturehandler = useAnimatedGestureHandler({
    onStart() {
        runOnJS(setMoving)(true)
    },
    onActive() {},
    onFinish() {
        runOnJS(setMoving)(false)
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
        position: 'absolute',
        left: 0,
        right: 0,
        top: (top - 1) * ITEM_HEIGHT,
        elevation: moving? 1: 0,
        zIndex: withSpring(moving? 10 : 0)
      }
  })

  return (
    <View
      style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gesturehandler}>
        <Animated.View style={{maxWidth: '80%'}}>{render}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};
