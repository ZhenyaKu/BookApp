import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import normalize from 'react-native-normalize';

import { BookCard } from './BookCard';
import { Book } from '../types';
import { theme } from '../constants/theme';

interface YouWillLikeSectionProps {
  books: Book[];
  onBookPress: (bookId: number) => void;
}

export const YouWillLikeSection = ({
  books,
  onBookPress,
}: YouWillLikeSectionProps) => {
  const renderBook = ({ item }: { item: Book }) => (
    <BookCard
      book={item}
      onPress={() => onBookPress(item.id)}
      variant="light"
    />
  );

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You will also like</Text>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(16),
  },
  title: {
    ...theme.typography.title.nunito20,
    color: theme.colors.mainText,
    marginBottom: normalize(16),
    paddingHorizontal: normalize(16),
  },
  listContent: {
    paddingHorizontal: normalize(16),
  },
});
