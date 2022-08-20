import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from './components/Header/HomeHeader';
import colors from '../../utils/colors';
import {ListSection} from './components/Section/ListSection';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {MyText} from 'components/text';
import {HomeFooter} from './components/Footer/HomeFooter';
import {MyList} from './components/List/MyList';

const HomeContainer = () => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={colors.gray06}
          />
          <HomeHeader />
          <ListSection />
          <View style={{margin: 10}}>
            <Text style={styles.text}>My Lists</Text>
          </View>
          <MyList />
          <HomeFooter />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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

export default HomeContainer;
