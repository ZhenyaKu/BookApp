import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import normalize from 'react-native-normalize';

import { Book } from '../types';
import { theme } from '../constants/theme';

type BookCardVariant = 'dark' | 'light';

interface BookCardProps {
  book: Book;
  onPress: () => void;
  variant?: BookCardVariant;
}

export const BookCard = ({
  book,
  onPress,
  variant = 'dark',
}: BookCardProps) => {
  const titleColor =
    variant === 'dark' ? theme.colors.whiteOpacity70 : theme.colors.mainText;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {book.cover_url ? (
          <FastImage
            source={{
              uri: book.cover_url,
              priority: FastImage.priority.normal,
            }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={[styles.title, { color: titleColor }]} numberOfLines={2}>
        {book.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: normalize(120),
    marginRight: normalize(8),
  },
  imageContainer: {
    width: normalize(120),
    height: normalize(150),
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: theme.colors.placeholder,
    marginBottom: normalize(4),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.placeholder,
  },
  title: {
    ...theme.typography.body.semibold16,
    marginHorizontal: normalize(2),
  },
});
