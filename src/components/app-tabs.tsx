import { NativeTabs } from 'expo-router/native-tabs';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill', }} md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="skills">
        <NativeTabs.Trigger.Icon sf={{ default: 'apple.terminal', selected: 'apple.terminal.fill', }} md="terminal" />
        <NativeTabs.Trigger.Label>Skills</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="portfolio">
        <NativeTabs.Trigger.Icon sf={{ default: 'apple.terminal', selected: 'apple.terminal.fill', }} md="terminal" />
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'folder',
            selected: 'folder.fill',
          }}
          md={{
            default: 'folder',
            selected: 'folder_open',
          }} />
        <NativeTabs.Trigger.Label>Portfolio</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
