import { useEffect, useState } from 'react';

import { Platform, StyleSheet } from 'react-native';

import { ThemedScrollView } from '@/components/themed-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export interface Skill {
  id: number
  link: string
  name: string
  typeId: number
}

export interface SkillType {
  description: string
  id: number
  title: string
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

  if (isLoadingSkills || isLoadingSkillTypes)
    return (
      <ThemedScrollView>
        <ThemedView style={styles.container}>
          <ThemedText themeColor="green">Loading...</ThemedText>
        </ThemedView>
      </ThemedScrollView>
    )

  if (error)
    return (
      <ThemedScrollView>
        <ThemedView style={styles.container}>
          <ThemedText themeColor="green">{ error }</ThemedText>
        </ThemedView>
      </ThemedScrollView>
    )

  return (
    <ThemedScrollView>
      <ThemedView style={styles.container}>
        {skillTypes.map((skillType) => (
          <ThemedView
            key={`skillType-${skillType.id}`}
            style={ styles.containerSkills }
            border={skillType.id % 2 == 0 ? "blue" : "green"}
          >
            <ThemedText themeColor={skillType.id % 2 == 0 ? "blue" : "green"} type="subtitle">
              {skillType.title}
            </ThemedText>
            {skills.filter(s => s.typeId == skillType.id).map((skill) => (
              <ThemedText key={`skill-${skill.id}`}>{skill.name}</ThemedText>
            ))}
            <ThemedText themeColor={skillType.id % 2 == 0 ? "blue" : "green"} type="small">
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
  scrollView: {
    flex: 1,
  },
});
