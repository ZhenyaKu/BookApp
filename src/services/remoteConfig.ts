import { configureRemoteConfig } from './firebase';
import { RemoteConfigData } from '../types';
import { REMOTE_CONFIG_KEY } from '../constants/config';

export const fetchRemoteConfigData = async (): Promise<RemoteConfigData> => {
  try {
    const remoteConfigInstance = await configureRemoteConfig();

    try {
      await remoteConfigInstance.fetch(0);
      await remoteConfigInstance.activate();
    } catch (fetchError) {
      console.warn(
        'Remote Config fetch failed, using cached values:',
        fetchError,
      );
    }

    const jsonDataString = remoteConfigInstance.getString(REMOTE_CONFIG_KEY);

    if (!jsonDataString || jsonDataString === '{}') {
      console.warn('Remote Config data is empty');
      return {
        books: [],
        top_banner_slides: [],
        you_will_like_section: [],
        details_carousel: [],
      };
    }

    let jsonData: RemoteConfigData;
    try {
      jsonData = JSON.parse(jsonDataString);
    } catch (parseError) {
      console.error('Failed to parse Remote Config JSON:', parseError);
      throw new Error('Invalid JSON format in Remote Config data');
    }

    if (!jsonData.books || !Array.isArray(jsonData.books)) {
      jsonData.books = [];
    }

    if (
      !jsonData.top_banner_slides ||
      !Array.isArray(jsonData.top_banner_slides)
    ) {
      jsonData.top_banner_slides = [];
    }

    if (
      !jsonData.you_will_like_section ||
      !Array.isArray(jsonData.you_will_like_section)
    ) {
      jsonData.you_will_like_section = [];
    }

    // details_carousel: use from JSON if exists, fallback to books
    if (
      !jsonData.details_carousel ||
      !Array.isArray(jsonData.details_carousel)
    ) {
      jsonData.details_carousel = jsonData.books;
    }

    return jsonData;
  } catch (error) {
    console.error('Error fetching Remote Config data:', error);
    return {
      books: [],
      top_banner_slides: [],
      you_will_like_section: [],
      details_carousel: [],
    };
  }
};
