import React from "react";
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "utils/colors";
import { fontSize } from "utils/fontsize";
import { fontWeights } from "utils/sizings";
import { Content } from "./component/content/Content";
import { Footer } from "./component/footer/Footer";
import Header from "./component/header/Header";

const EdtiScreen = () => {
    return <SafeAreaView>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{height: '100%'}}
    >
      <View style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={colors.gray06}
        />
        <Header />
        <Content/>
        <Footer/>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray06,
      height: '100%',
      padding: 14,
    },
    text: {
      fontSize: fontSize.big,
      color: colors.black,
      fontWeight: fontWeights.w600,
    },
  });

export default EdtiScreen