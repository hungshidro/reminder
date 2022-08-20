import React, {ReactNode} from 'react';
import {PaddingView} from './PaddingView';
import {RadiusView} from './RadiusView';
import {Switch} from 'react-native-switch';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'utils/colors';
import {fontSize} from 'utils/fontsize';
import {fontWeights} from 'utils/sizings';

export const SwitchView = ({
  isActive,
  SetIsAvtive,
  title,
  subtitle,
  icon,
  iconColor,
}: {
  isActive: boolean;
  SetIsAvtive: Function;
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
}) => {
  return (
    <PaddingView style={styles.container}>
      <View style={[styles.row]}>
        <View style={[styles.titleContainer, styles.centerHorizontal]}>
          <Ionicons
            name={icon}
            size={20}
            color={colors.white}
            style={{
              backgroundColor: iconColor,
              padding: 5,
              borderRadius: 9,
            }}
          />
          <View>
            <Text style={styles.titleText}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        <Switch
          value={isActive}
          renderActiveText={false}
          renderInActiveText={false}
          disabled={false}
          onValueChange={value => SetIsAvtive(value)}
          circleBorderWidth={0}
          barHeight={33}
          switchRightPx={2.3}
          switchLeftPx={2.3}
          switchBorderRadius={19}
          backgroundActive="#32D74B"
          
        />
      </View>
    </PaddingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    minHeight: 64,
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
    marginLeft: 15,
  },
  centerHorizontal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    widt: '100%',
  },
  subtitle: {
    fontSize: fontSize.small,
    fontWeight: fontWeights.w400,
    color: colors.blue,
    marginLeft: 15,
  },
});
