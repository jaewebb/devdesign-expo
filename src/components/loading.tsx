import { Platform, StyleSheet } from 'react-native';

import { ThemedScrollView } from '@/components/themed-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { MaxContentWidth } from '@/constants/theme';

export function Loading() {
  return (
    <ThemedScrollView accessibilityRole={Platform.OS === 'android' ? undefined : 'main'}>
      <ThemedView style={styles.container}>
        <ThemedText themeColor="green">Loading...</ThemedText>
      </ThemedView>
    </ThemedScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    maxWidth: MaxContentWidth,
  }
});
