import React, {Fragment, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import colors from 'utils/colors';

const Loading = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(()=> {
	const timeout = setTimeout(()=> {
		setLoading(false)
	},2000)
	return () => {
		clearTimeout(timeout)
	}
  },[])

  return (
    <Fragment>
      {isLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="small" color={colors.black} />
        </View>
      ) : (
        <Text
          style={{alignSelf: 'center', color: colors.gray02}}>
          Nothing to show
        </Text>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    backgroundColor: colors.loading,
    zIndex: 9999,
  },
});

export default Loading;
