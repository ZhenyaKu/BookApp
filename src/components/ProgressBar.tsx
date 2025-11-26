import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import normalize from 'react-native-normalize';

import { theme } from '../constants/theme';

const PROGRESS_WIDTH = normalize(274);
const PROGRESS_HEIGHT = normalize(6);
const PROGRESS_RADIUS = normalize(6);

export const ProgressBar = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-PROGRESS_WIDTH * 0.4, PROGRESS_WIDTH],
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.progress,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    overflow: 'hidden',
  },
  track: {
    width: PROGRESS_WIDTH,
    height: PROGRESS_HEIGHT,
    backgroundColor: theme.colors.progressBarTrack,
    borderRadius: PROGRESS_RADIUS,
    overflow: 'hidden',
  },
  progress: {
    width: PROGRESS_WIDTH * 0.4,
    height: PROGRESS_HEIGHT,
    backgroundColor: theme.colors.progressBar,
    borderRadius: PROGRESS_RADIUS,
  },
});
