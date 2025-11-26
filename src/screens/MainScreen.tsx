import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import normalize from 'react-native-normalize';

import { AppLayout } from '../components/AppLayout';
import { GenreSection } from '../components/GenreSection';
import { TopBanner } from '../components/TopBanner';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../constants/theme';
import { GenreGroup } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooksData } from '../store/thunks/booksThunks';
import { groupByGenre } from '../utils/groupByGenre';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

export const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { books, topBannerSlides, loading, error } = useAppSelector(
    state => state.books,
  );

  useEffect(() => {
    if (books.length === 0 && !loading && !error) {
      dispatch(fetchBooksData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBookPress = (bookId: number) => {
    navigation.navigate('Details', { bookId });
  };

  const genreGroups: GenreGroup[] = groupByGenre(books);

  if (error) {
    return (
      <AppLayout title="Library">
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Library" scrollable>
      <View style={styles.content}>
        <TopBanner
          slides={topBannerSlides}
          books={books}
          onSlidePress={handleBookPress}
        />
        <View style={styles.genreSectionContainer}>
          {genreGroups.map(genreGroup => (
            <GenreSection
              key={genreGroup.genre}
              genre={genreGroup.genre}
              books={genreGroup.books}
              onBookPress={handleBookPress}
            />
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: normalize(20),
  },
  genreSectionContainer: {
    marginTop: normalize(40),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    ...theme.typography.body.regular16,
    color: theme.colors.white,
    textAlign: 'center',
  },
});
