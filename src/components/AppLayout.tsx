import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';

import { theme } from '../constants/theme';
import { BackButton } from './BackButton';

type AppLayoutProps = {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  scrollable?: boolean;
};

export const AppLayout = ({
  title,
  showBackButton = false,
  onBackPress,
  scrollable = false,
  children,
}: PropsWithChildren<AppLayoutProps>) => {
  const Header = () => (
    <View style={styles.header}>
      {showBackButton && onBackPress && <BackButton onPress={onBackPress} />}
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );

  if (scrollable) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: normalize(18),
    paddingBottom: normalize(8),
    paddingHorizontal: theme.spacing.md,
    minHeight: 48,
  },
  title: {
    ...theme.typography.title.nunito20,
    color: theme.colors.pink,
  },
});
