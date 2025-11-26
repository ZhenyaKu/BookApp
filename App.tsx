import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { AppNavigator } from './src/navigation/AppNavigator';
import { store } from './src/store';
import { theme } from './src/constants/theme';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </View>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
