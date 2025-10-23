import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

// Diller ve bayraklar
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" }
];

// Props tipini ekledik!
type SettingsScreenProps = {
  language: string;
  changeLanguage: (code: string) => void;
};

export default function SettingsScreen({
  language = "en",
  changeLanguage = (code: string) => {},
}: SettingsScreenProps) {
  const navigation = useNavigation();

  // Metinler
  const t = {
    settingsTitle: "Settings",
    chooseLanguage: "Choose Language",
    languageChanged: "Language updated successfully!",
    back: "Back",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 22, color: "#059669" }}>←</Text>
        </TouchableOpacity>
        <LinearGradient colors={["#34d399", "#059669"]} style={styles.headerGradient}>
          <Text style={styles.headerText}>{t.settingsTitle}</Text>
        </LinearGradient>
      </View>

      {/* Settings Card */}
      <View style={styles.settingsCard}>
        <View style={styles.settingsTitleRow}>
          <Text style={styles.settingsIcon}>🌐</Text>
          <Text style={styles.settingsTitle}>{t.chooseLanguage}</Text>
        </View>
        <View style={styles.langGrid}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langBtn,
                language === lang.code
                  ? styles.langBtnSelected
                  : styles.langBtnDefault,
              ]}
              activeOpacity={0.85}
              onPress={() => changeLanguage(lang.code)}
            >
              <View style={styles.langRow}>
                <Text style={styles.langFlag}>{lang.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.langName}>{lang.name}</Text>
                  <Text style={styles.langCode}>{lang.code.toUpperCase()}</Text>
                </View>
                {language === lang.code && (
                  <View style={styles.langCheck}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.langChangedBox}>
          <Text style={styles.langChangedText}>🌍 {t.languageChanged}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    padding: 18,
    alignItems: "center",
    minHeight: 700,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerGradient: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#059669",
    shadowOpacity: 0.09,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: "#bbf7d0",
    width: width * 0.97,
    paddingVertical: 28,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  settingsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  settingsIcon: {
    fontSize: 32,
    color: "#06b6d4",
    marginRight: 6,
  },
  settingsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#059669",
  },
  langGrid: {
    marginBottom: 18,
  },
  langBtn: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
  },
  langBtnDefault: {
    backgroundColor: "#f4f4f4",
    borderColor: "#e5e7eb",
  },
  langBtnSelected: {
    backgroundColor: "#bbf7d0",
    borderColor: "#059669",
    shadowColor: "#059669",
    shadowOpacity: 0.16,
    shadowRadius: 7,
    elevation: 3,
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  langFlag: {
    fontSize: 36,
    marginRight: 8,
  },
  langName: {
    fontSize: 17,
    color: "#059669",
    fontWeight: "bold",
  },
  langCode: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  langCheck: {
    width: 32,
    height: 32,
    backgroundColor: "#059669",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  langChangedBox: {
    backgroundColor: "#bbf7d0",
    borderRadius: 16,
    alignItems: "center",
    padding: 12,
  },
  langChangedText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },
});