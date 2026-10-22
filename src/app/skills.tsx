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
    title: 'Skills',
    description: 'A list of my skills.',
  };
}

export interface Skill {
  id: number;
  link: ExternalPathString;
  name: string;
  typeId: number;
}

export interface SkillType {
  description: string;
  id: number;
  title: string;
}

export default function Skills() {
  const [skills, setSkills] = useState(Array<Skill>);
  const [skillTypes, setSkillTypes] = useState(Array<SkillType>);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [isLoadingSkillTypes, setIsLoadingSkillTypes] = useState(false);
  const [error, setError] = useState('');

  const BASE_URL = Platform.select({
    android: process.env.EXPO_PUBLIC_BASE_URL_ANDROID,
    ios: process.env.EXPO_PUBLIC_BASE_URL_IOS,
    default: process.env.EXPO_PUBLIC_BASE_URL_WEB,
  });

  useEffect(() => {
    setIsLoadingSkillTypes(true);
    fetch(`${BASE_URL}/skills/skilltype`)
      .then(response => response.json())
      .then(data => {
        setError('');
        setSkillTypes(data);
        setIsLoadingSkillTypes(false);
      })
      .catch(error => {
        setError(`Error fetching data: ${error}`);
        setIsLoadingSkillTypes(false);
        setSkillTypes([]);
      });
  }, []);
  useEffect(() => {
    setIsLoadingSkills(true);
    fetch(`${BASE_URL}/skills/skill`)
      .then(response => response.json())
      .then(data => {
        setError('');
        setSkills(data);
        setIsLoadingSkills(false)
      })
      .catch(error => {
        setError(`Error fetching data: ${error}`);
        setIsLoadingSkills(false);
        setSkills([]);
      });
  }, []);

  if (isLoadingSkills || isLoadingSkillTypes) return <Loading />

  if (error) return <Error errorMsg={error} />

  return (
    <ThemedScrollView accessibilityRole={Platform.OS === 'android' ? undefined : 'main'}>
      <ThemedView style={styles.container}>
        {skillTypes && skillTypes.map((skillType) => (
          <ThemedView
            key={`skillType-${skillType.id}`}
            style={ styles.containerSkills }
            border={skillType.id % 2 == 0 ? "blue" : "green"}
          >
            <ThemedText themeColor={skillType.id % 2 == 0 ? "blue" : "green"} type="subtitle">
              {skillType.title}
            </ThemedText>
            {skills && skills.filter(s => s.typeId == skillType.id).map((skill) => (
              skill.link ? (
                <ExternalLink key={`skill-${skillType.id}-${skill.id}`} href={skill.link} asChild>
                  <Pressable style={({ pressed }) => pressed && styles.pressed}>
                    <ThemedText type="link">{skill.name}</ThemedText>
                  </Pressable>
                </ExternalLink>
                ) : (
                <ThemedText key={`skill-${skill.id}`}>{skill.name}</ThemedText>
              )
            ))}
            <ThemedText style={{ paddingTop: Spacing.two }} themeColor={skillType.id % 2 == 0 ? "blue" : "green"} type="small">
              {skillType.description}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    maxWidth: MaxContentWidth,
  },
  containerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  containerSkills: {
    borderRadius: Spacing.three,
    gap: Spacing.two,
    marginTop: Spacing.four,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
});
