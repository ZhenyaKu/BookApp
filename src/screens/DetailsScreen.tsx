import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import normalize from 'react-native-normalize';

import { AppLayout } from '../components/AppLayout';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../constants/theme';
import { useAppSelector } from '../store/hooks';
import { Book } from '../types';

import { DetailsCarousel } from '../components/DetailsCarousel';
import { BookStats } from '../components/BookStats';
import { YouWillLikeSection } from '../components/YouWillLikeSection';
import { MainButton } from '../components/Button';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Divider = () => <View style={styles.divider} />;

export const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { bookId } = route.params;

  const { books, youWillLikeIds, detailsCarousel } = useAppSelector(
    state => state.books,
  );

  const initialBook = useMemo(
    () => books.find(b => b.id === bookId) || books[0],
    [books, bookId],
  );

  const [selectedBook, setSelectedBook] = useState<Book | null>(initialBook);

  const youWillLikeBooks = useMemo(
    () =>
      youWillLikeIds
        .map(id => books.find(book => book.id === id))
        .filter((book): book is Book => book !== undefined),
    [youWillLikeIds, books],
  );

  const handleBookChange = (book: Book) => {
    setSelectedBook(book);
  };

  const handleYouWillLikeBookPress = (newBookId: number) => {
    navigation.push('Details', { bookId: newBookId });
  };

  const handleReadNow = () => {
    console.log('Read Now pressed for book:', selectedBook?.name);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!selectedBook) {
    return (
      <AppLayout showBackButton onBackPress={handleGoBack}>
        <Text style={styles.errorText}>Book not found</Text>
      </AppLayout>
    );
  }

  return (
    <AppLayout showBackButton onBackPress={handleGoBack}>
      <DetailsCarousel
        books={detailsCarousel}
        initialBookId={bookId}
        onBookChange={handleBookChange}
      />

      <View style={styles.modalContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <BookStats book={selectedBook} />

          <Divider />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{selectedBook.summary}</Text>
          </View>

          <Divider />

          <YouWillLikeSection
            books={youWillLikeBooks}
            onBookPress={handleYouWillLikeBookPress}
          />

          <View style={styles.buttonContainer}>
            <MainButton onPress={handleReadNow} />
          </View>
        </ScrollView>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    marginTop: normalize(2),
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginHorizontal: normalize(16),
  },
  section: {
    padding: normalize(16),
  },
  sectionTitle: {
    ...theme.typography.title.nunito20,
    color: theme.colors.mainText,
    marginBottom: normalize(8),
  },
  summaryText: {
    ...theme.typography.body.regular14,
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    marginTop: normalize(24),
  },
  errorText: {
    ...theme.typography.body.regular16,
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: normalize(100),
  },
});
