import {Line} from 'components/line/Line';
import {PaddingView} from 'components/view/PaddingView';
import {RadiusView} from 'components/view/RadiusView';
import React, {TouchEvent, useState} from 'react';
import {
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import colors from 'utils/colors';
import {CONSTANTS} from 'utils/constants';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {ReminderDataType} from 'utils/types/rootTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icon} from 'utils/icons/icons';

export const AddImageModal = ({
  visible,
  setVisible,
  setData,
  location,
}: {
  visible: number;
  setVisible: Function;
  setData: Function;
  location: number;
}) => {
  const indexMutil = CONSTANTS.indexMutilModal;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        cameraLaunch();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const cameraLaunch = () => {
    launchCamera(
      {
        cameraType: 'back',
        mediaType: 'photo',
        saveToPhotos: true,
        maxHeight: 100,
        maxWidth: 100,
      },
      res => {
        res.assets?.map(value => {
          setData((prevData: ReminderDataType) => {
            prevData.image = value.uri;
            return prevData;
          });
          setVisible(indexMutil.closeModal)
        });
      },
    );
  };

  const imageGalleryLaunch = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        res => {
          res.assets?.map(value => {
            setData((prevData: ReminderDataType) => {
              prevData.image = value.uri;
              return prevData;
            });
            setVisible(indexMutil.closeModal)
          });
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      visible={visible === indexMutil.addImageModal ? true : false}
      onRequestClose={() => setVisible(indexMutil.closeModal)}
      statusBarTranslucent={true}
      transparent={true}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => setVisible(indexMutil.closeModal)}>
        <RadiusView style={[styles.wrapper, {marginTop: location - 100}]}>
          <TouchableOpacity onPress={() => imageGalleryLaunch()}>
            <PaddingView style={[styles.row, styles.centerHorizational]}>
              <Text style={styles.text}>Photo Library</Text>
              <Ionicons
                name={icon.images_outline}
                size={20}
                color={colors.black}
              />
            </PaddingView>
          </TouchableOpacity>
          <Line width={100} />
          <TouchableOpacity>
            <PaddingView style={[styles.row, styles.centerHorizational]}>
              <Text style={styles.text}>Scan Document</Text>
              <Ionicons name={icon.scan} size={20} color={colors.black} />
            </PaddingView>
          </TouchableOpacity>
          <Line width={100} />
          <TouchableOpacity onPress={() => requestCameraPermission()}>
            <PaddingView style={[styles.row, styles.centerHorizational]}>
              <Text style={styles.text}>Take Photo</Text>
              <Ionicons
                name={icon.camera_outline}
                size={20}
                color={colors.black}
              />
            </PaddingView>
          </TouchableOpacity>
        </RadiusView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  wrapper: {
    width: '75%',
    marginTop: 100,
    marginLeft: 15,
    backgroundColor: colors.white,
    flexGrow: 0,
  },
  text: {
    color: colors.black,
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
  centerHorizational: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
