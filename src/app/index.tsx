import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Image } from 'expo-image';
import type { Metadata } from 'expo-router/server';

import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { ThemedScrollView } from '@/components/themed-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { MaxContentWidth, Spacing } from '@/constants/theme';

export function generateMetadata(): Metadata {
  return {
    title: 'Home',
    description: 'Contains a bio about Jae Webb.',
  };
}

export interface Bio {
  avatar: {
    alt: string;
    url: string;
  }
  description: string[];
  firstName: string;
  goals: string[];
  lastName: string;
  title: string;
}

export default function HomeScreen() {
  const [bio, setBio] = useState({} as Bio);
  const [error, setError] = useState('');
  const [isLoadingBio, setIsLoadingBio] = useState(false);

  const BASE_URL = Platform.select({
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
    ios: process.env.EXPO_PUBLIC_BASE_URL_IOS,
    default: process.env.EXPO_PUBLIC_BASE_URL_WEB,
  });

  useEffect(() => {
    setIsLoadingBio(true);
    fetch(`${BASE_URL}/bio/bio`)
      .then(response => response.json())
      .then(data => {
        setError('');
        setBio(data);
        setIsLoadingBio(false)
      })
      .catch(error => {
        setError(`Error fetching data: ${error}`);
        setIsLoadingBio(false);
        setBio({} as Bio);
      });
  }, []);

  if (isLoadingBio) return <Loading />
  
  if (error) return <Error errorMsg={error} />

  const uri = `https://${process.env.EXPO_PUBLIC_BLOB_STORE_ID}.public.blob.vercel-storage.com/${bio?.avatar?.url}`

  return (
    <ThemedScrollView accessibilityRole={Platform.OS === 'android' ? undefined : 'main'}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.containerBio}>
          <Image style={styles.avatar} source={{ uri }} accessibilityLabel={bio?.avatar?.alt} />
          <ThemedView style={styles.containerTitle}>
            <ThemedText themeColor="green" type="title">
              {bio?.firstName} {bio?.lastName}
            </ThemedText>
            <ThemedText themeColor="blue" type="subtitle">
              {bio?.title}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        {bio?.description?.map((paragraph, i) => <ThemedText key={`paragraph-${i}`}>{paragraph}</ThemedText>)}
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
  },
  container: {
    flexGrow: 1,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  containerBio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Spacing.two,
  },
  containerTitle: {
    paddingHorizontal: Spacing.four,
  },
  sectionsWrapper: {
    gap: Spacing.four,
    paddingTop: Spacing.four,
  },
});
