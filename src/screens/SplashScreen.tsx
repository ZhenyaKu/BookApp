import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import normalize from 'react-native-normalize';

import { ProgressBar } from '../components/ProgressBar';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../constants/theme';
import { SPLASH_DELAY_MS } from '../constants/config';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const splashBg = require('../../assets/splashScreenBg.png');

export const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    try {
      const NativeSplash = require('react-native-splash-screen').default;
      if (NativeSplash && NativeSplash.hide) {
        NativeSplash.hide();
      }
    } catch (e) {
      // Native splash not available
    }

    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, SPLASH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={splashBg}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Book App</Text>
        <Text style={styles.subtitle}>Welcome to Book App</Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.title.georgia52,
    color: theme.colors.button,
    marginBottom: normalize(12),
  },
  subtitle: {
    ...theme.typography.title.nunito24,
    color: theme.colors.white,
    marginBottom: normalize(20),
  },
  progressContainer: {
    alignSelf: 'center',
  },
});
