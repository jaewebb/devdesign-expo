import { Platform, StyleSheet } from 'react-native';

import { Image } from 'expo-image';
import type { Metadata } from 'expo-router/server';

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

export default function HomeScreen() {
  return (
    <ThemedScrollView accessibilityRole={Platform.OS === 'android' ? undefined : 'main'}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.containerBio}>
          <Image style={styles.avatar} source={require('@/assets/images/avatar.png')} accessibilityLabel="Photo of Jae Webb" />
          <ThemedView style={styles.containerTitle}>
            <ThemedText themeColor="green" type="title">
              Jae Webb
            </ThemedText>
            <ThemedText themeColor="blue" type="subtitle">
              Senior Web Developer
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedText>
          I'm a software developer with over a decade of experience building modern, user-focused web applications.
          I specialize in front-end development, with expertise in React, Vue.js, TypeScript, and JavaScript, and a passion for creating polished, accessible, and intuitive digital experiences.
        </ThemedText>
        <ThemedText>
          Throughout my career, I've had the opportunity to work on a variety of projects, from financial planning tools and interactive proposal generators to responsive web applications and reusable design systems.
          I've worked with talented teams at organizations like RBC and CapIntel, where I've contributed to high-impact projects, and earned recognition for my work.
        </ThemedText>
        <ThemedText>
          I care about the details that make great software: clean, maintainable code, thoughtful user experiences, accessibility, and consistency across devices.
          I'm also a strong believer in continuous learning, whether that means exploring new technologies, refining my skills, or finding better ways to solve problems.
          I enjoy collaborating with designers and developers, sharing knowledge, and helping turn ideas into reliable, well-crafted products.
        </ThemedText>
        <ThemedText>
          Outside of development, I enjoy hockey, fitness, gaming, 3D modeling, digital art, and music.
          My creative interests influence how I approach software development, combining technical problem-solving with an appreciation for design, visual detail, and creativity.
          I'm always looking for opportunities to build meaningful things, learn something new, and contribute to projects that make a difference. 
        </ThemedText>
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
