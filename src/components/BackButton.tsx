import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';

import { theme } from '../constants/theme';
import { ArrowLeftIcon } from './Icons';

interface BackButtonProps {
  onPress: () => void;
  color?: string;
}

export const BackButton = ({
  onPress,
  color = theme.colors.white,
}: BackButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <ArrowLeftIcon
        width={normalize(21)}
        height={normalize(14)}
        fill={color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
