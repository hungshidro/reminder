import {Line} from 'components';
import React, {useState} from 'react';
import {Modal, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';

export const SearchHeader = ({
  style,
  isSearching,
  setSearching,
  text,
  setText
}: {
  style?: ViewStyle;
  isSearching: boolean;
  setSearching: Function;
  text: string;
  setText: Function
}) => {
  const [isFocus, setFocus] = useState(false);

  const onChangeText = (value:string) => {
    setText(value)
    if(value != '') {
      setSearching(true)
    }
    else if(value === '') {
      setSearching(false)
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isFocus ? colors.white : colors.gray05,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: isSearching ? 0 : 15,
          borderBottomRightRadius: isSearching ? 0 : 15,
        },
      ]}>
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
          value={text}
          selectionColor={colors.blue}
          style={[styles.text, styles.textInput]}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChangeText={onChangeText}
        />
      </View>
      {isFocus && <Line width={90} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    minHeight: 45,
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
  searchForm: {
    flexDirection: 'row',
    width: '100%',
  },
});
