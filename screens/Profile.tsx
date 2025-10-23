import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  // Sabit metinler, dil desteği eklemek istersen kolayca değiştirilebilir
  const t = {
    profileTitle: "Profile",
    ecoHero: "Eco Hero",
    gamesPlayed: "Games Played",
    totalScore: "Total Score",
    lessonsCompleted: "Lessons Completed",
    yourImpact: "Your Impact",
    treesPlanted: "Trees Planted",
    waterSaved: "Water Saved",
    itemsRecycled: "Items Recycled",
    motivational: '"Every small action counts towards a greener planet!" 🌍',
    back: "Back",
    ecoWarrior: "Eco Warrior",
  };

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 22, color: '#059669' }}>←</Text>
        </TouchableOpacity>
        <LinearGradient colors={['#34d399', '#059669']} style={styles.headerGradient}>
          <Text style={styles.headerText}>{t.profileTitle}</Text>
        </LinearGradient>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        {/* Avatar Section */}
        <View style={styles.avatarCenter}>
          <View style={styles.avatarCircle}>
            {/* Kullanıcı Avatarı (emoji veya svg) */}
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <Text style={styles.ecoWarrior}>{t.ecoWarrior}</Text>
          <View style={styles.ecoHero}>
            <Text style={styles.ecoHeroEmoji}>🌿</Text>
            <Text style={styles.ecoHeroText}>{t.ecoHero}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderColor: '#fbbf24', backgroundColor: '#fef9c3' }]}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statNum}>0</Text>
            <Text style={styles.statLabel}>{t.gamesPlayed}</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#38bdf8', backgroundColor: '#e0f2fe' }]}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statNum}>0</Text>
            <Text style={styles.statLabel}>{t.totalScore}</Text>
          </View>
          <View style={[styles.statCard, { borderColor: '#c4b5fd', backgroundColor: '#f3e8ff' }]}>
            <Text style={styles.statEmoji}>🏅</Text>
            <Text style={styles.statNum}>3</Text>
            <Text style={styles.statLabel}>{t.lessonsCompleted}</Text>
          </View>
        </View>

        {/* Badge Section */}
        <View style={styles.impactCard}>
          <Text style={styles.impactTitle}>🏅 {t.yourImpact}</Text>
          <View style={styles.impactRow}>
            <Text style={styles.impactLabel}>🌱 {t.treesPlanted}</Text>
            <Text style={styles.impactValue}>0</Text>
          </View>
          <View style={styles.impactRow}>
            <Text style={styles.impactLabel}>💧 {t.waterSaved}</Text>
            <Text style={[styles.impactValue, { color: '#06b6d4' }]}>0 drops</Text>
          </View>
          <View style={styles.impactRow}>
            <Text style={styles.impactLabel}>♻️ {t.itemsRecycled}</Text>
            <Text style={[styles.impactValue, { color: '#a21caf' }]}>0</Text>
          </View>
        </View>

        {/* Motivational Message */}
        <View style={styles.motivationBox}>
          <Text style={styles.motivationText}>{t.motivational}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    padding: 18,
    alignItems: 'center',
    minHeight: 700,
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
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#059669',
    shadowOpacity: 0.09,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: '#bbf7d0',
    width: width * 0.97,
    paddingVertical: 28,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  avatarCenter: {
    alignItems: 'center',
    marginBottom: 22,
  },
  avatarCircle: {
    width: 110,
    height: 110,
    backgroundColor: '#34d399',
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#059669',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2,
  },
  avatarIcon: {
    fontSize: 68,
    color: '#fff',
  },
  ecoWarrior: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  ecoHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#bbf7d0',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 22,
    marginBottom: 4,
  },
  ecoHeroEmoji: {
    fontSize: 20,
    marginRight: 4,
    color: '#059669',
  },
  ecoHeroText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#059669',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  statEmoji: {
    fontSize: 34,
    marginBottom: 6,
  },
  statNum: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: '#bbf7d0',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: '#059669',
    marginBottom: 10,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
  },
  impactLabel: {
    fontSize: 16,
    color: '#374151',
  },
  impactValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#059669',
  },
  motivationBox: {
    marginTop: 16,
    backgroundColor: '#bbf7d0',
    borderRadius: 16,
    alignItems: 'center',
    padding: 12,
  },
  motivationText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#64748b',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});