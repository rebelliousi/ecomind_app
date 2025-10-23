import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");

const stages = [
  { id: 0, emoji: "🌰", message: "Seed: The journey begins!", size: 80 },
  { id: 1, emoji: "🌱", message: "Sprout: Life emerges!", size: 90 },
  { id: 2, emoji: "🌿", message: "Branching: Growth continues!", size: 90 },
  { id: 3, emoji: "🌳", message: "Tree: Fully grown, well done!", size: 90 },
];

export default function TreeGameScreen() {
  const [currentStage, setCurrentStage] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  const growTree = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage((prev) => prev + 1);
      if (currentStage === stages.length - 2) {
        setShowCongrats(true);
      }
    }
  };

  const restart = () => {
    setCurrentStage(0);
    setShowCongrats(false);
  };

  const currentStageData = stages[currentStage];
  const isFullyGrown = currentStage === stages.length - 1;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerIconWrap}>
          <Text style={styles.headerIcon}>🌲</Text>
        </View>
        <Text style={styles.headerText}>Grow a Tree!</Text>
      </View>

      {/* Main Area */}
      <LinearGradient
        colors={["#a7f3d0", "#f0fdf4"]}
        style={styles.mainGradient}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: currentStageData.size, marginBottom: 20 }}>
            {currentStageData.emoji}
          </Text>
        </View>

        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ fontSize: 14, color: "#059669", marginBottom: 4 }}>
            Stage {currentStage + 1}/4
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#059669" }}>
            {currentStageData.message}
          </Text>
        </View>

        {showCongrats && (
          <View style={styles.congratsBox}>
            <Text style={styles.congratsText}>Congratulations! Your tree is fully grown!</Text>
          </View>
        )}
      </LinearGradient>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {!isFullyGrown ? (
          <TouchableOpacity
            style={styles.growBtn}
            onPress={growTree}
            activeOpacity={0.85}
          >
            <Text style={styles.growBtnText}>💧🌞 Water & Sun</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.restartBtn}
            onPress={restart}
            activeOpacity={0.85}
          >
            <Text style={styles.restartBtnText}>🔄 Restart</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footerBox}>
        <Text style={styles.footerText}>🌍 Every tree helps our planet breathe!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 18,
    paddingTop: 28,
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerIconWrap: {
    backgroundColor: "#059669",
    borderRadius: 18,
    padding: 10,
    marginRight: 8,
  },
  headerIcon: {
    fontSize: 32,
    color: "#fff",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#059669",
  },
  mainGradient: {
    borderRadius: 30,
    paddingVertical: 34,
    paddingHorizontal: 16,
    marginBottom: 16,
    minWidth: width * 0.93,
    minHeight: 320,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#bbf7d0",
    shadowColor: "#059669",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  congratsBox: {
    backgroundColor: "#bbf7d0",
    borderRadius: 16,
    padding: 12,
    marginTop: 14,
    borderWidth: 2,
    borderColor: "#059669",
    alignItems: "center",
  },
  congratsText: {
    color: "#059669",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  growBtn: {
    backgroundColor: "#059669",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 38,
    marginHorizontal: 4,
    shadowColor: "#059669",
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 3,
  },
  growBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  restartBtn: {
    backgroundColor: "#f59e42",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 38,
    marginHorizontal: 4,
    shadowColor: "#fbbf24",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  restartBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footerBox: {
    backgroundColor: "#bbf7d0",
    borderRadius: 16,
    padding: 10,
    marginTop: 12,
    minWidth: width * 0.93,
    alignItems: "center",
  },
  footerText: {
    color: "#059669",
    fontSize: 15,
    textAlign: "center",
  },
});