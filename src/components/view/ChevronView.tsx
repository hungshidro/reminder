import React from 'react';
import colors from 'utils/colors';
import {PaddingView} from './PaddingView';
import {RadiusView} from './RadiusView';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';
import {icon} from 'utils/icons/icons';

export const ChevronView = ({
  title,
  iconName,
  iconColor,
  handlerOnPress,
  itemPicked,
  iconShown,
  subtitle,
}: {
  title: string;
  iconName?: string;
  iconColor?: string;
  handlerOnPress?: Function;
  itemPicked?: string;
  iconShown: boolean;
  subtitle?: string;
}) => {
  return (
    <PaddingView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (handlerOnPress) handlerOnPress();
        }}>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', width: '100%'},
          ]}>
          <View style={styles.titleContainer}>
            {iconShown && (
              <Ionicons
                name={iconName ?? ''}
                size={20}
                color={colors.white}
                style={{
                  backgroundColor: iconColor,
                  padding: 5,
                  borderRadius: 9,
                  marginRight: 15,
                }}
              />
            )}
            <View>
              <Text style={[styles.titleText]}>{title}</Text>
              {subtitle && (
                <Text style={[styles.subTitleText]}>{subtitle}</Text>
              )}
            </View>
          </View>
          <View style={[styles.row, styles.centerHorizontal]}>
            <Text style={[styles.text, {color: colors.gray02}]}>
              {itemPicked ?? ''}
            </Text>
            <Ionicons
              name={icon.chevron_foward}
              size={23}
              color={colors.gray04}
            />
          </View>
        </View>
      </TouchableOpacity>
    </PaddingView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    justifyContent: 'center',
  },
  text: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
  },
  row: {
    flexDirection: 'row',
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: fontSize.regular,
    fontWeight: fontWeights.w400,
    color: colors.black,
  },
  subTitleText: {
    fontSize: fontSize.small,
    fontWeight: fontWeights.w400,
    color: colors.gray03,
  },
});
