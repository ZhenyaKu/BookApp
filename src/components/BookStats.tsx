import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import normalize from 'react-native-normalize';

import { Book } from '../types';
import { theme } from '../constants/theme';

interface BookStatsProps {
  book: Book;
}

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const BookStats = ({ book }: BookStatsProps) => {
  return (
    <View style={styles.container}>
      <StatItem value={book.views} label="Readers" />
      <StatItem value={book.likes} label="Likes" />
      <StatItem value={book.quotes} label="Quotes" />
      <StatItem value={book.genre} label="Genre" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: normalize(20),
    paddingBottom: normalize(10),
    paddingHorizontal: normalize(30),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...theme.typography.title.nunito18,
    color: theme.colors.mainText,
    marginBottom: normalize(2),
  },
  statLabel: {
    ...theme.typography.caption.semibold12,
    color: theme.colors.divider,
  },
});
