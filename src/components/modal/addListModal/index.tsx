import {PaddingView} from 'components/view/PaddingView';
import {RadiusView} from 'components/view/RadiusView';
import React, {useEffect, useState} from 'react';
import {CONSTANTS} from 'utils/constants';
import {MyModal} from '../modalBase/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ChevronView} from 'components/view/ChevronView';
import { listAPI } from 'utils/api/listAPI';
import { useAppDispatch } from 'redux/hook';
import { addNewList } from 'redux/reducer/list/listSlice';

export const AddListModal = ({
  visible,
  setVisible,
}: {
  visible: number;
  setVisible: Function;
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [listName, setListName] = useState('');
  const [listColor, setColor] = useState(colors.red);
  const [listicon, setIcon] = useState(icon.happy_outline);
  const dispatch = useAppDispatch()

  const indexModal = CONSTANTS.indexModal;
  const headerLeft = (
    <View style={[styles.centerHorizontal]}>
      <Text style={[styles.text, {color: colors.blue}]}>Cancel</Text>
    </View>
  );
  const headerRight = (
    <Text
      style={[
        styles.text,
        {
          color: isFilled ? colors.blue : colors.gray02,
          fontWeight: fontWeights.w600,
        },
      ]}>
      Done
    </Text>
  );

  const colorData = [
    {id: '1', color: colors.red},
    {id: '2', color: colors.orange_dark},
    {id: '3', color: colors.yellow},
    {id: '4', color: colors.green},
    {id: '5', color: colors.teal},
    {id: '6', color: colors.blue},
    {id: '7', color: colors.indigo},
    {id: '8', color: colors.crimson},
    {id: '9', color: colors.purple},
    {id: '10', color: colors.peru},
    {id: '11', color: colors.dark_slate_gray},
    {id: '12', color: colors.pink},
  ];

  const iconData = [
    {id: '1', icon: icon.happy_outline},
    {id: '2', icon: icon.list_outline},
    {id: '3', icon: icon.bookmark},
    {id: '4', icon: icon.pin},
    {id: '5', icon: icon.gift},
    {id: '6', icon: icon.bicycle},
    {id: '7', icon: icon.airplane},
    {id: '8', icon: icon.barbell},
    {id: '9', icon: icon.book},
    {id: '10', icon: icon.build},
    {id: '11', icon: icon.cafe},
    {id: '12', icon: icon.cart},
    {id: '12', icon: icon.pencil},
    {id: '12', icon: icon.american_football},
    {id: '12', icon: icon.eye},
  ];

  const handlerRight = async () => {
    const res = await listAPI.addNewList({
      createAt: new Date().getTime(),
      name: listName,
      color: listColor,
      icon: listicon,
      count: 0,
    })
    if(res.ok === true) {
      setVisible(indexModal.closeModal);
      ToastAndroid.show('Succes',ToastAndroid.LONG);
      dispatch(addNewList({id: res.data.id, count: 0, name: listName,color: listColor,icon: listicon}))
      setListName('')
      setColor(colors.red)
      setIcon(icon.happy_outline)
    }
    else {
      ToastAndroid.show('Fail', ToastAndroid.LONG);
    }
  }

  return (
    <MyModal
      visible={visible === indexModal.addListModal}
      setVisible={setVisible}
      headerTitle="New List"
      disableRight={!isFilled}
      headerLeft={headerLeft}
      headerRight={headerRight}
      handlerHeaderLeft={() => setVisible(indexModal.closeModal)}
      handlerHeaderRight={handlerRight}
      >
      <RadiusView>
        <PaddingView
          style={{justifyContent: 'flex-start', alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 50,
              backgroundColor: listColor,
              padding: 10,
              minWidth: 86,
              minHeight: 86,
              paddingLeft: 13,
            }}>
            <Ionicons name={listicon} color={colors.white} size={60} />
          </View>
          <TextInput
            value={listName}
            onChangeText={value => {
              setListName(value);
              if (value != '') setIsFilled(true);
              else setIsFilled(false);
            }}
            placeholder="List Name"
            placeholderTextColor={colors.gray03}
            selectionColor={colors.darkBlue}
            style={[styles.textInput]}
          />
        </PaddingView>
      </RadiusView>
      <RadiusView style={{marginTop: 15}}>
        <ChevronView
          iconShown={true}
          iconColor={colors.blue}
          iconName={icon.list_outline}
          title="Make into Smart List"
          subtitle="Organize using tags and other filter"
        />
      </RadiusView>
      <RadiusView style={{marginTop: 15}}>
        <PaddingView>
          <FlatList
            data={colorData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={{marginBottom: 2}}
                  onPress={() => setColor(item.color)}>
                  <View
                    style={[
                      {
                        height: 54,
                        width: 54,
                        padding: 4,
                      },
                      listColor === item.color && styles.colorPicked,
                    ]}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: item.color,
                        borderRadius: 30,
                      }}></View>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={6}
            columnWrapperStyle={{justifyContent: 'space-between'}}
          />
        </PaddingView>
      </RadiusView>
      <RadiusView style={{marginTop: 15}}>
        <PaddingView>
          <FlatList
            data={iconData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={{marginBottom: 4}}
                  onPress={() => setIcon(item.icon)}>
                  <Ionicons
                    name={item.icon}
                    size={30}
                    color={listicon === item.icon ? colors.blue : colors.gray02}
                    style={{
                      borderRadius: 20,
                      minWidth: 41,
                      backgroundColor:
                        listicon === item.icon
                          ? 'rgba(90,200,250,0.4)'
                          : colors.gray06,
                      padding: 4,
                      paddingLeft: 5.5,
                      margin: 5,
                      marginHorizontal: 7.5
                    }}
                  />
                </TouchableOpacity>
              );
            }}
            numColumns={6}
          />
        </PaddingView>
      </RadiusView>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginBottom: 38,
  },
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
  row: {
    flexDirection: 'row',
  },
  centerVertical: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  item: {
    marginTop: 20,
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    fontSize: fontSize.big,
    fontWeight: fontWeights.w600,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.gray06,
    marginTop: 20,
    borderRadius: 12,
  },
  colorPicked: {
    borderWidth: 3,
    borderColor: colors.gray04,
    borderRadius: 30,
  },
});
