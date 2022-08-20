import React from 'react';
import AppNavigator from 'navigation';
import {createNotificationChannel} from 'utils/notification';
import {Provider} from 'react-redux';
import {persistor, store} from 'redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { useAppSelector } from 'redux/hook';

createNotificationChannel();
const App = () => {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <AppNavigator />
        </PersistGate>
      </Provider>
  );
};

export default App;
