import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import type { ExternalPathString } from 'expo-router';
import type { Metadata } from 'expo-router/server';

import { Error } from '@/components/error';
import { ExternalLink } from '@/components/external-link';
import { Loading } from '@/components/loading';
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

export interface PortfolioItem {
  id: number;
  description: string;
  link: ExternalPathString;
  name: string;
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState(Array<PortfolioItem>);
  const [error, setError] = useState('');
  const [isLoadingPortfolioItems, setIsLoadingPortfolioItems] = useState(false);

  const BASE_URL = Platform.select({
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
    ios: process.env.EXPO_PUBLIC_BASE_URL_IOS,
    default: process.env.EXPO_PUBLIC_BASE_URL_WEB,
  });

  useEffect(() => {
    setIsLoadingPortfolioItems(true);
    fetch(`${BASE_URL}/portfolioItems/portfolioItem`)
      .then(response => response.json())
      .then(data => {
        setError('');
        setPortfolioItems(data);
        setIsLoadingPortfolioItems(false)
      })
      .catch(error => {
        setError(`Error fetching data: ${error}`);
        setIsLoadingPortfolioItems(false);
        setPortfolioItems([]);
      });
  }, []);

  if (isLoadingPortfolioItems) return <Loading />

  if (error) return <Error errorMsg={error} />

  return (
    <ThemedScrollView accessibilityRole={Platform.OS === 'android' ? undefined : 'main'}>
      <ThemedView style={styles.container}>
        <ThemedText themeColor="green" type="subtitle">Portfolio</ThemedText>
        <ThemedText themeColor="textSecondary">
          Most of what I've worked on has been used internally or is client-only, so I started a portfolio page with proof of concepts!
        </ThemedText>

        {portfolioItems && portfolioItems.map((portfolioItem) => (
          <ThemedView key={`portfolio-item-${portfolioItem.id}`}>
            <ExternalLink href={portfolioItem.link} asChild>
              <Pressable style={({ pressed }) => pressed && styles.pressed}>
                <ThemedText type="link">{portfolioItem.name}</ThemedText>
              </Pressable>
            </ExternalLink>
            <ThemedText>{portfolioItem.description}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: Spacing.three,
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
