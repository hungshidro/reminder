import React from "react";
import { Text, TextProps } from "react-native";

export const MyText = (props: TextProps ) => {
    return <Text {...props} style = {[props.style, {fontFamily: 'SF-Pro-Rounded-Regular'}]}/>
}