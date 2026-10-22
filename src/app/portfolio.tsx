import { Platform, Pressable, StyleSheet } from 'react-native';

import type { Metadata } from 'expo-router/server';

import { ExternalLink } from '@/components/external-link';
import { ThemedScrollView } from '@/components/themed-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { MaxContentWidth, Spacing } from '@/constants/theme';

export function generateMetadata(): Metadata {
  return {
    title: 'Portfolio',
    description: 'A portfolio page with links to various web app examples as well as a link to my GitHub page.',
  };
}

export default function Portfolio() {
  return (
    <ThemedScrollView accessibilityRole={Platform.OS === 'android' ? undefined : 'main'}>
      <ThemedView style={styles.container}>
        <ThemedText themeColor="green" type="subtitle">Portfolio</ThemedText>
        <ThemedText themeColor="textSecondary">
          Most of what I've worked on has been used internally or is client-only, so I started a portfolio page with proof of concepts!
        </ThemedText>

        <ExternalLink href="https://github.com/jaewebb" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">GitHub Repo</ThemedText>
          </Pressable>
        </ExternalLink>
        <ExternalLink href="https://jae-webb-character-sheet.vercel.app/" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">My Character Sheet: a profile in the style of D&D</ThemedText>
          </Pressable>
        </ExternalLink>
        <ExternalLink href="https://hockey-highlights.vercel.app/" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">Hockey Highlights: search for a country, pick a league, see some hockey fun</ThemedText>
          </Pressable>
        </ExternalLink>
        <ExternalLink href="https://portfolio-fund-data.vercel.app/" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">Fund Portfolio: a work in progress to display funds from TwelveData</ThemedText>
          </Pressable>
        </ExternalLink>
        <ExternalLink href="https://pet-food-calculator.vercel.app/" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">Pet food calculator: calculate the cost of food per oz or g</ThemedText>
          </Pressable>
        </ExternalLink>
        <ExternalLink href="https://portfolio-dashboard-jae.vercel.app/" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">MakenBank: a sample dashboard</ThemedText>
          </Pressable>
        </ExternalLink>
        <ExternalLink href="https://mint-salon.vercel.app/" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">Mint Salon: a salon site</ThemedText>
          </Pressable>
        </ExternalLink>
        <ExternalLink href="https://kitty-city-demo.vercel.app/" asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">Kitty City: a cat adoption site</ThemedText>
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  containerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
});
