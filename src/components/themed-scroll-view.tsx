import { Platform, ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabInset, Spacing, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedScrollView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left + Spacing.two,
      paddingRight: insets.right + Spacing.two,
      paddingBottom: insets.bottom,
    },
    ios: {
      paddingTop: insets.top - Spacing.six,
      paddingLeft: insets.left + Spacing.two,
      paddingRight: insets.right + Spacing.two,
      paddingBottom: insets.bottom,
    },
    web: {
      marginTop: Spacing.six,
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      contentContainerStyle={[styles.containerContent, contentPlatformStyle]}
      contentInset={insets}
      style={[{ backgroundColor: theme[type ?? 'background']}, styles.scrollView, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  containerContent: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
});