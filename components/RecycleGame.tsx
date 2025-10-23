import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type SelectionsType = Record<number, string>;

export default function RecycleGameScreen() {
  // Dil desteği yoksa sabit metinler kullan
  const t = {
    newspaper: "Newspaper",
    bottle: "Plastic Bottle",
    glassJar: "Glass Jar",
    paper: "Paper",
    plastic: "Plastic",
    glass: "Glass",
    sortTrash: "Sort the Trash!",
    selectCategory: "Choose the correct category for each item.",
    checkAnswer: "Check Answer",
    correct: "Correct! 🌱",
    tryAgain: "Try Again!",
  };

  const items = [
    { id: 1, name: t.newspaper, correct: "paper", emoji: "📰" },
    { id: 2, name: t.bottle, correct: "plastic", emoji: "🥤" },
    { id: 3, name: t.glassJar, correct: "glass", emoji: "🫙" },
  ];

  const categories = [
    { id: "paper", label: t.paper, color: ["#fbbf24", "#f59e42"] as [string, string] },
    { id: "plastic", label: t.plastic, color: ["#38bdf8", "#06b6d4"] as [string, string] },
    { id: "glass", label: t.glass, color: ["#34d399", "#059669"] as [string, string] },
  ];

  const [selections, setSelections] = useState<SelectionsType>({});
  const [result, setResult] = useState<null | "correct" | "wrong">(null);

  const handleSelect = (itemId: number, category: string) => {
    setSelections(prev => ({
      ...prev,
      [itemId]: category,
    }));
    setResult(null);
  };

  const checkAnswers = () => {
    const allCorrect = items.every(item => selections[item.id] === item.correct);
    setResult(allCorrect ? "correct" : "wrong");
  };

  const allSelected = items.every(item => selections[item.id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#34d399', '#059669', '#14b8a6'] as [string, string, string]}
        style={styles.headerGradient}
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerText}>{t.sortTrash}</Text>
      </LinearGradient>
      <Text style={styles.desc}>{t.selectCategory}</Text>

      {items.map((item) => (
        <View style={styles.itemCard} key={item.id}>
          <View style={styles.itemRow}>
            <Text style={styles.itemEmoji}>{item.emoji}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <View style={styles.categoryRow}>
            {categories.map(category => {
              const selected = selections[item.id] === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryBtn,
                    selected && { borderWidth: 0, elevation: 4 },
                  ]}
                  activeOpacity={0.85}
                  onPress={() => handleSelect(item.id, category.id)}
                >
                  <LinearGradient
                    colors={selected ? category.color : ["#fff", "#f4f4f4"] as [string, string]}
                    style={[
                      styles.categoryGradient,
                      selected && { borderColor: "#34d399", borderWidth: 2 },
                    ]}
                  >
                    <Text style={[
                      styles.categoryText,
                      selected && { color: "#fff", fontWeight: "bold" },
                    ]}>
                      {category.label}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.checkBtn,
          !allSelected && { backgroundColor: "#94a3b8" },
        ]}
        onPress={checkAnswers}
        activeOpacity={0.85}
        disabled={!allSelected}
      >
        <Text style={styles.checkBtnText}>{t.checkAnswer}</Text>
      </TouchableOpacity>

      {result && (
        <View style={[
          styles.resultBox,
          result === "correct"
            ? { backgroundColor: "#d1fae5", borderColor: "#059669" }
            : { backgroundColor: "#fee2e2", borderColor: "#ef4444" }
        ]}>
          <Text style={[
            styles.resultText,
            result === "correct" ? { color: "#059669" } : { color: "#ef4444" }
          ]}>
            {result === "correct" ? t.correct : t.tryAgain}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    minHeight: 600,
  },
  headerGradient: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 36,
    marginBottom: 8,
    marginTop: 10,
    alignSelf: 'center',
    elevation: 4,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
  },
  desc: {
    fontSize: 16,
    color: '#059669',
    marginBottom: 26,
    textAlign: 'center',
    fontWeight: '500',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 22,
    width: width * 0.93,
    shadowColor: '#059669',
    shadowOpacity: 0.09,
    shadowRadius: 9,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#f0fdf4',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  itemEmoji: {
    fontSize: 42,
    marginRight: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#059669',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 6,
  },
  categoryBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    minWidth: width * 0.21,
    elevation: 1,
  },
  categoryGradient: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryText: {
    fontSize: 15,
    color: '#059669',
  },
  checkBtn: {
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 38,
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  checkBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: .5,
  },
  resultBox: {
    borderRadius: 20,
    borderWidth: 2,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});