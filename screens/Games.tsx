import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
// Oyun ekranlarını import et (dosya yolunu kendi projenle uyumlu yaz)
import RecycleGameScreen from '@/components/RecycleGame';
import WaterGameScreen from '@/components/WaterGame';
import TreeGameScreen from '@/components/TreeGame';

export default function GamesScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 22, color: '#059669' }}>←</Text>
        </TouchableOpacity>
        <LinearGradient colors={['#34d399', '#059669']} style={styles.headerGradient}>
          <Text style={styles.headerText}>Games</Text>
        </LinearGradient>
      </View>

      {/* Games */}
      <View style={styles.gamesSpace}>
        <RecycleGameScreen />
        <WaterGameScreen />
        <TreeGameScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
    minHeight: 700,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
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
  gamesSpace: {
    width: '100%',
    gap: 24,
  },
});