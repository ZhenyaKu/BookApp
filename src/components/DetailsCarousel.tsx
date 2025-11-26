import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import normalize from 'react-native-normalize';

import { Book } from '../types';
import { theme } from '../constants/theme';

interface DetailsCarouselProps {
  books: Book[];
  initialBookId: number;
  onBookChange: (book: Book) => void;
}

const CARD_WIDTH = normalize(200);
const CARD_HEIGHT = normalize(250);
const CARD_GAP = normalize(8);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const DetailsCarousel = ({
  books,
  initialBookId,
  onBookChange,
}: DetailsCarouselProps) => {
  const initialIndex = books.findIndex(book => book.id === initialBookId);
  const startIndex = initialIndex >= 0 ? initialIndex : 0;

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <FastImage
          source={{
            uri: item.cover_url,
            priority: FastImage.priority.high,
          }}
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        {item.author}
      </Text>
    </View>
  );

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={CARD_WIDTH + CARD_GAP}
        height={CARD_HEIGHT + normalize(60)}
        data={books}
        renderItem={renderItem}
        defaultIndex={startIndex}
        onSnapToItem={index => {
          if (books[index]) {
            onBookChange(books[index]);
          }
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.8,
          parallaxScrollingOffset: 50,
        }}
        style={styles.carousel}
        loop={false}
        snapEnabled
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  carousel: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: theme.colors.placeholder,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  bookTitle: {
    ...theme.typography.title.nunito20,
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: normalize(16),
  },
  bookAuthor: {
    ...theme.typography.body.bold14,
    color: theme.colors.whiteOpacity70,
    textAlign: 'center',
    marginTop: normalize(4),
  },
});
