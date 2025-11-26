import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import normalize from 'react-native-normalize';

import { TopBannerSlide, Book } from '../types';
import { theme } from '../constants/theme';
import { TOP_BANNER_AUTO_SCROLL_INTERVAL_MS } from '../constants/config';

interface TopBannerProps {
  slides: TopBannerSlide[];
  books: Book[];
  onSlidePress: (bookId: number) => void;
}

const BANNER_WIDTH = normalize(343);
const BANNER_HEIGHT = normalize(160);

export const TopBanner = ({ slides, books, onSlidePress }: TopBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCoverUrl = (slide: TopBannerSlide): string => {
    const book = books.find(b => b.id === slide.book_id);
    return book?.cover_url || slide.cover;
  };

  const renderSlide = ({ item }: { item: TopBannerSlide }) => (
    <TouchableOpacity
      style={styles.slide}
      activeOpacity={0.9}
      onPress={() => onSlidePress(item.book_id)}
    >
      <FastImage
        source={{
          uri: getCoverUrl(item),
          priority: FastImage.priority.high,
        }}
        style={styles.slideImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === currentIndex && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Carousel
          loop={slides.length > 1}
          width={BANNER_WIDTH}
          height={BANNER_HEIGHT}
          data={slides}
          renderItem={renderSlide}
          autoPlay={slides.length > 1}
          autoPlayInterval={TOP_BANNER_AUTO_SCROLL_INTERVAL_MS}
          scrollAnimationDuration={300}
          onSnapToItem={index => {
            const actualIndex =
              ((index % slides.length) + slides.length) % slides.length;
            setCurrentIndex(actualIndex);
          }}
          enabled
        />
        {slides.length > 1 && (
          <View style={styles.paginationContainer}>{renderPagination()}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselWrapper: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    position: 'relative',
  },
  slide: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.xl,
  },
  paginationContainer: {
    position: 'absolute',
    height: normalize(7),
    bottom: normalize(8),
    left: normalize(126),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(7),
  },
  paginationDot: {
    width: normalize(7),
    height: normalize(7),
    borderRadius: normalize(3.5),
    backgroundColor: theme.colors.dark,
    marginHorizontal: normalize(5),
  },
  paginationDotActive: {
    backgroundColor: theme.colors.pink,
  },
});
