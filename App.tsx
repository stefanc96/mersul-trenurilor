import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {appStyles, ThemeWrapper} from './src/theme';
import {AppNavigator} from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import PushNotification from 'react-native-push-notification';

const App = () => {
  PushNotification.removeAllDeliveredNotifications();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper>
          <Layout style={appStyles.container}>
            <SafeAreaView style={appStyles.container}>
              <AppNavigator />
            </SafeAreaView>
          </Layout>
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
};

export default App;
