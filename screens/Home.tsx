import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type NavCardType = {
  title: string;
  emoji: string;
  colors: readonly [string, string];
  route: string;
};

const navigationCards: NavCardType[] = [
  {
    title: 'Lessons',
    emoji: '📘',
    colors: ['#34d399', '#059669'] as const,
    route: 'Lessons',
  },
  {
    title: 'Games',
    emoji: '🎮',
    colors: ['#059669', '#14b8a6'] as const,
    route: 'Games',
  },
  {
    title: 'Profile',
    emoji: '👤',
    colors: ['#06b6d4', '#3b82f6'] as const,
    route: 'Profile',
  },
  {
    title: 'Settings',
    emoji: '⚙️',
    colors: ['#6366f1', '#0ea5e9'] as const,
    route: 'Settings',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Floating Leaves */}
      <Text style={[styles.floating, styles.floating1]}>🍃</Text>
      <Text style={[styles.floating, styles.floating2]}>🌱</Text>
      <Text style={[styles.floating, styles.floating3]}>🌿</Text>
      <ScrollView contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#34d399', '#059669', '#14b8a6'] as const}
          start={{ x: 0.1, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Text style={styles.headerText}>Ecomind</Text>
        </LinearGradient>
        <Text style={styles.slogan}>Think green. Act green.</Text>

        {/* Navigation Cards */}
        <View style={styles.cardGrid}>
          {navigationCards.map((card) => (
            <TouchableOpacity
              key={card.title}
              style={styles.cardTouch}
              onPress={() => navigation.navigate(card.route as never)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={card.colors}
                style={styles.cardGradient}
              >
                <Text style={styles.cardEmoji}>{card.emoji}</Text>
                <Text style={styles.cardTitle}>{card.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with <Text style={{ color: '#34d399' }}>💚</Text> for our planet
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollInner: {
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 60,
    minHeight: height,
    alignItems: 'center',
    width: '100%',
  },
  floating: {
    position: 'absolute',
    opacity: 0.13,
    fontSize: 60,
    zIndex: -1,
  },
  floating1: { top: 70, left: 40 },
  floating2: { top: width / 2, right: 30 },
  floating3: { bottom: 90, left: width / 3 },
  headerGradient: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 46,
    marginBottom: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 46,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
  },
  slogan: {
    fontSize: 18,
    color: '#059669',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 40,
  },
  cardTouch: {
    width: width * 0.41,
    margin: 8,
    borderRadius: 20,
    shadowColor: '#059669',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
  },
  cardGradient: {
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 38,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 28,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
    letterSpacing: .5,
  },
});