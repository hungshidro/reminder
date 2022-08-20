import React, {ReactNode} from 'react';
import {Modal, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from 'utils/colors';
import {CONSTANTS} from 'utils/constants';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';

type Props = {
  visible: boolean;
  setVisible: Function;
  children: ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  headerLeft?: ReactNode;
  headerTitle: string;
  headerRight?: ReactNode;
  handlerHeaderLeft?: Function;
  handlerHeaderRight?: Function;
  disableRight?: boolean;
  previousModal?: number;
};

export const MyModal = ({
  visible,
  setVisible,
  children,
  animationType,
  headerLeft,
  headerTitle,
  headerRight,
  handlerHeaderLeft,
  handlerHeaderRight,
  disableRight,
  previousModal,
}: Props) => {
  const inset = useSafeAreaInsets();

  const indexModal = CONSTANTS.indexModal;

  return (
    <Modal
      style={{height: '100%', width: '100%'}}
      visible={visible}
      animationType={animationType ?? 'fade'}
      onRequestClose={() => setVisible(previousModal ?? indexModal.closeModal)}
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.container}>
        <View style={[styles.contentContainer, {marginTop: inset.top + 63}]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() => {
                  if (handlerHeaderLeft) handlerHeaderLeft();
                }}>
                {headerLeft}
              </TouchableOpacity>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                disabled={disableRight}
                onPress={() => {if(handlerHeaderRight) handlerHeaderRight()}}>
                {headerRight}
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}>
              <Text style={styles.textTitle}>{headerTitle}</Text>
            </View>
          </View>
          <View style={styles.contentWrapper}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: colors.gray06,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 14,
    flexShrink: 1,
    marginBottom: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerLeft: {
    maxWidth: '40%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '35%',
  },
  headerRight: {
    maxWidth: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '35%',
  },
  contentWrapper: {
    paddingHorizontal: 15,
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 10,
    top: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w700,
    color: colors.black,
  },
});
