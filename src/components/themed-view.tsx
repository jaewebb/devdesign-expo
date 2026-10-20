import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  border?: ThemeColor;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, border, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'], borderColor: theme[border ?? 'background'], borderWidth: border ? 1 : 0 }, style]} {...otherProps} />;
}
