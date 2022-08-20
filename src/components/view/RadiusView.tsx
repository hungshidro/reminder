import React, { CSSProperties, ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import colors from "utils/colors";

export const RadiusView = ({children, style}: ViewProps) => {
    return (
        <View style={[style,styles.container]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: colors.white,
        minHeight: 63,
    }
})