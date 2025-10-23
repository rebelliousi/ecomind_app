import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const lessons = [
  {
    title: 'Paper',
    description: 'Paper can be recycled to save trees and energy.',
    emoji: '📄',
    colors: ['#fbbf24', '#f59e42'],
    bgColor: '#fef3c7',
  },
  {
    title: 'Plastic',
    description: 'Plastic is harmful for nature.',
    emoji: '🥤',
    colors: ['#38bdf8', '#06b6d4'],
    bgColor: '#e0f2fe',
  },
  {
    title: 'Glass',
    description: 'Glass is 100% recyclable.',
    emoji: '🍾',
    colors: ['#34d399', '#059669'],
    bgColor: '#d1fae5',
  },
];

export default function LessonsScreen() {
  const navigation = useNavigation();

  return (
    <View style={lessonStyles.container}>
      {/* Header */}
      <View style={lessonStyles.headerRow}>
        <TouchableOpacity style={lessonStyles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </TouchableOpacity>
        <LinearGradient colors={['#34d399', '#059669'] as [string, string]} style={lessonStyles.headerGradient}>
          <Text style={lessonStyles.headerText}>Ecology Lessons</Text>
        </LinearGradient>
      </View>
      {/* Lessons Grid */}
      <ScrollView contentContainerStyle={{ paddingBottom: 34 }}>
        {lessons.map((lesson) => (
          <View style={[lessonStyles.lessonCard, { backgroundColor: lesson.bgColor }]} key={lesson.title}>
            <LinearGradient colors={lesson.colors as [string, string]} style={lessonStyles.lessonIconWrap}>
              <Text style={lessonStyles.lessonEmoji}>{lesson.emoji}</Text>
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={lessonStyles.lessonTitle}>{lesson.title}</Text>
              <Text style={lessonStyles.lessonDesc}>{lesson.description}</Text>
            </View>
            <View style={lessonStyles.lessonFooter}>
              <Text style={{ fontSize: 18, color: '#059669' }}>🌲</Text>
              <Text style={lessonStyles.lessonFooterText}>Together we can make a difference!</Text>
            </View>
          </View>
        ))}
        {/* Call to action */}
        <TouchableOpacity style={lessonStyles.ctaButton} onPress={() => navigation.navigate('Games' as never)} activeOpacity={0.85}>
          <LinearGradient colors={['#34d399', '#059669'] as [string, string]} style={lessonStyles.ctaGradient}>
            <Text style={lessonStyles.ctaText}>Try the Games! 🎮</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const lessonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#aaa',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerGradient: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: .5,
  },
  lessonCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#059669',
    shadowOpacity: 0.09,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  lessonIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#aaa',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginRight: 14,
  },
  lessonEmoji: {
    fontSize: 32,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#059669',
  },
  lessonDesc: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 10,
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  lessonFooterText: {
    fontSize: 13,
    color: '#059669',
    marginLeft: 4,
    fontWeight: '500',
  },
  ctaButton: {
    marginTop: 16,
    alignSelf: 'center',
    borderRadius: 24,
    width: width * 0.8,
    shadowColor: '#059669',
    shadowOpacity: 0.13,
    shadowRadius: 8,
  },
  ctaGradient: {
    paddingVertical: 18,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: .5,
  },
});