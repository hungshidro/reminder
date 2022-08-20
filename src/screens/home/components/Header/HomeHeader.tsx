import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import colors from '../../../../utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {navigate} from 'navigation/service';
import screenNames from 'utils/screenName';
import {SearchHeader} from './component/SearchView';
import {Line, Loading} from 'components';
import {ReminderDataType} from 'utils/types/rootTypes';
import {useAppSelector} from 'redux/hook';
import {ReminderState} from 'redux/reducer/reminder/reminderSlice';
import {reminderAPI} from 'utils/api/reminderAPI';
import {SearchItem} from './component/Item';

const HomeHeader = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState('');
  const [searchData, setSearchData] = useState<ReminderDataType[]>([]);

  const reminder = useAppSelector(state => state.reminder.reminder);
  const list = useAppSelector(state => state.list.list);

  useEffect(() => {
    if (text != '') {
      const data: ReminderDataType[] = [];
      list.forEach(async (value, index, arr) => {
        const res = await reminderAPI.search(value.id, text);
        if (res) {
          if (res.length > 0) {
            data.push(...res);
          }
          if (index === arr.length - 1) {
            setSearchData(data);
          }
        }
      });
    }
  }, [text, isSearching]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonLayout}>
        <TouchableOpacity onPress={() => navigate(screenNames.EDIT_SCREEN)}>
          <Text style={[styles.text, styles.editButton]}>Edit</Text>
        </TouchableOpacity>
      </View>
      <SearchHeader
        isSearching={isSearching}
        setSearching={setIsSearching}
        text={text}
        setText={setText}
      />
      {isSearching && (
        <View
          style={{
            minHeight: 60,
            backgroundColor: colors.white,
            position: 'absolute',
            top: 84,
            zIndex: 100,
            width: '100%',
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray05,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          {isSearching && <Line width={100} />}
          <FlatList
            data={searchData}
            renderItem={({item}) => <SearchItem item={item} />}
            ListEmptyComponent={<Loading />}
            ItemSeparatorComponent={() => <Line width={90} />}
          />
        </View>
      )}
    </View>
  );
};

export default HomeHeader;

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
