import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import {noop} from 'lodash';

const ANDROID_CHANNEL_ID = 'mersul-trenurilor';
export const configureNotifications = () => {
  PushNotification.createChannel(
    {
      channelId: ANDROID_CHANNEL_ID,
      channelName: 'Mersul trenurilor',
    },
    noop,
  );
  PushNotification.configure({
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
  });
};
