import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const fontFam = type === "title" || type ==="subtitle" ? Fonts.display : Fonts.sans;
  
  return <Text style={[{ color: theme[themeColor ?? 'text'], fontFamily: fontFam }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
  },
  smallBold: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 20,
  },
  default: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 44,
  },
  link: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
