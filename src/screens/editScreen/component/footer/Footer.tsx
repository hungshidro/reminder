import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {CONSTANTS} from 'utils/constants';
import {AddListModal} from 'components/modal/addListModal';

export const Footer = () => {
  const [indexModalVisible, setIndexModalVisible] = useState(0);
  const indexModal = CONSTANTS.indexModal;
  const {height, width} = Dimensions.get('window')

  return (
    <View style={[styles.container,{width:width}]}>
      <TouchableOpacity style={styles.wrapper}>
        <Text style={[styles.text]}>Add Group</Text>
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <TouchableOpacity
          onPress={() => setIndexModalVisible(indexModal.addListModal)}>
          <Text style={styles.text}>Add List</Text>
        </TouchableOpacity>
      </View>
      <AddListModal
        visible={indexModalVisible}
        setVisible={setIndexModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    padding: 14,
    bottom: 0,
    left:0,
    borderTopWidth: 0.9,
    borderTopColor: colors.gray05,
    backgroundColor: 'rbga(0,0,0,0,5)'
  },
  wrapper: {
    flexDirection: 'row',
  },
  textWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
  },
  text: {
    fontSize: fontSize.regular,
    color: colors.blue,
  },
});
