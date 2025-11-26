import '@react-native-firebase/app';
import remoteConfig from '@react-native-firebase/remote-config';

let remoteConfigInstance: ReturnType<typeof remoteConfig> | null = null;
let isConfigured = false;

export const configureRemoteConfig = async () => {
  try {
    if (!remoteConfigInstance) {
      remoteConfigInstance = remoteConfig();
    }

    if (!isConfigured) {
      await remoteConfigInstance.setDefaults({
        json_data: JSON.stringify({
          books: [],
          top_banner_slides: [],
          you_will_like_section: [],
          details_carousel: [],
        }),
      });

      await remoteConfigInstance.setConfigSettings({
        minimumFetchIntervalMillis: 0,
      });

      isConfigured = true;
    }

    return remoteConfigInstance;
  } catch (error) {
    console.error('Error configuring Remote Config:', error);
    throw error;
  }
};

export const getRemoteConfig = () => {
  if (!remoteConfigInstance) {
    remoteConfigInstance = remoteConfig();
  }
  return remoteConfigInstance;
};
