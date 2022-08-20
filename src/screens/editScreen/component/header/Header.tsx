import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../../utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack } from 'navigation/service';

const Header = () => {

  return (
    <View style={styles.container}>
      <View style={styles.buttonLayout}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={[styles.text, styles.editButton]}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchForm}>
        <Ionicons
          size={24}
          name="search"
          color={colors.gray}
          style={{
            padding: 5,
            alignSelf: 'center',
          }}
        />
        <TextInput
          placeholder="Search"
          selectionColor={colors.blue}
          style={[styles.text, styles.textInput]}
          editable={false}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  searchForm: {
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: colors.gray05,
    marginTop: 12,
    height: 45,
  },
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
  textInput: {
    width: 'auto',
    flex: 1,
    marginRight: 15,
  },
  buttonLayout: {
    direction: 'rtl',
  },
  editButton: {
    color: colors.blue,
    fontWeight: fontWeights.w500,
  },
});
