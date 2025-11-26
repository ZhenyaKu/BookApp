import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import { BookCard } from './BookCard';
import { Book } from '../types';
import { theme } from '../constants/theme';

interface GenreSectionProps {
  genre: string;
  books: Book[];
  onBookPress: (bookId: number) => void;
}

export const GenreSection = ({
  genre,
  books,
  onBookPress,
}: GenreSectionProps) => {
  const renderBook = ({ item }: { item: Book }) => (
    <BookCard book={item} onPress={() => onBookPress(item.id)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.genreTitle}>{genre}</Text>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  genreTitle: {
    ...theme.typography.title.nunito20,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
});
