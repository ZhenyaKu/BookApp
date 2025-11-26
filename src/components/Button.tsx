import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';

import { theme } from '../constants/theme';

interface MainButtonProps {
  onPress: () => void;
}

export const MainButton = ({ onPress }: MainButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>Read Now</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.button,
    borderRadius: theme.borderRadius.xxl,
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: normalize(48),
    marginBottom: normalize(52),
  },
  buttonText: {
    ...theme.typography.button.primary,
    color: theme.colors.white,
  },
});
