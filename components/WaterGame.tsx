import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const GAME_HEIGHT = 340;

type DropType = {
  id: number;
  x: number;
  anim: Animated.Value;
};

export default function WaterGameScreen() {
  // Dil desteği yoksa sabit metinler kullan
  const t = {
    saveWater: "Save Water!",
    tapDrop: "Tap the water drops to save them.",
    start: "Start",
    playAgain: "Play Again",
    score: "Score",
    timeLeft: "Time Left",
    gameOver: "Game Over",
    yourScore: "Your Score",
  };

  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [drops, setDrops] = useState<DropType[]>([]);
  const [gameOver, setGameOver] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameStarted(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  // Drop creation effect
  useEffect(() => {
    if (!gameStarted) return;
    const dropInterval = setInterval(() => {
      const x = Math.random() * (width - 60);
      const anim = new Animated.Value(0);
      const drop: DropType = {
        id: Date.now() + Math.floor(Math.random() * 10000),
        x,
        anim,
      };
      setDrops(prev => [...prev, drop]);
      Animated.timing(anim, {
        toValue: GAME_HEIGHT - 50,
        duration: 2200,
        useNativeDriver: false,
      }).start(() => {
        setDrops(prev => prev.filter(d => d.id !== drop.id));
      });
    }, 800);

    return () => clearInterval(dropInterval);
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setDrops([]);
    setGameOver(false);
  };

  const catchDrop = (dropId: number) => {
    setDrops(prev => prev.filter(d => d.id !== dropId));
    setScore(prev => prev + 10);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#38bdf8', '#06b6d4', '#059669']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerText}>{t.saveWater}</Text>
      </LinearGradient>

      {!gameStarted ? (
        <View style={styles.centerBox}>
          <Text style={styles.desc}>{t.tapDrop}</Text>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={startGame}
            activeOpacity={0.8}
          >
            <Text style={styles.startBtnText}>{t.start}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.gameInfo}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>{t.score}</Text>
              <Text style={styles.infoValue}>{score}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>{t.timeLeft}</Text>
              <Text style={[styles.infoValue, { color: '#f59e42' }]}>{timeLeft}s</Text>
            </View>
          </View>
          <View style={styles.gameArea}>
            {drops.map(drop => (
              <Animated.View
                key={drop.id}
                style={[
                  styles.drop,
                  { left: drop.x, top: drop.anim },
                ]}
              >
                <TouchableOpacity
                  style={styles.dropTouchable}
                  activeOpacity={0.8}
                  onPress={() => catchDrop(drop.id)}
                >
                  <Text style={styles.dropEmoji}>💧</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </>
      )}

      {gameOver && (
        <View style={styles.gameOverBox}>
          <Text style={styles.gameOverTitle}>{t.gameOver}</Text>
          <Text style={styles.gameOverEmoji}>💧</Text>
          <Text style={styles.gameOverDesc}>{t.yourScore}</Text>
          <Text style={styles.gameOverScore}>{score}</Text>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={startGame}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>{t.playAgain}</Text>
          </TouchableOpacity>
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
  centerBox: {
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  desc: {
    fontSize: 16,
    color: '#059669',
    marginBottom: 26,
    textAlign: 'center',
    fontWeight: '500',
  },
  startBtn: {
    backgroundColor: '#06b6d4',
    borderRadius: 26,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    shadowColor: '#38bdf8',
    shadowOpacity: 0.17,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 6,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: .5,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 13,
    width: width * 0.93,
    marginBottom: 10,
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 15,
    color: '#059669',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 26,
    color: '#06b6d4',
    fontWeight: 'bold',
  },
  gameArea: {
    borderRadius: 24,
    backgroundColor: '#e0f2fe',
    borderWidth: 3,
    borderColor: '#38bdf8',
    height: GAME_HEIGHT,
    width: width * 0.93,
    marginTop: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  drop: {
    position: 'absolute',
    zIndex: 2,
  },
  dropTouchable: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropEmoji: {
    fontSize: 38,
    shadowColor: '#06b6d4',
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  gameOverBox: {
    marginTop: 38,
    backgroundColor: '#fff',
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#38bdf8',
    alignItems: 'center',
    paddingVertical: 28,
    width: width * 0.93,
    elevation: 5,
    shadowColor: '#38bdf8',
    shadowOpacity: 0.10,
    shadowRadius: 8,
  },
  gameOverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#06b6d4',
    textAlign: 'center',
    marginBottom: 10,
  },
  gameOverEmoji: {
    fontSize: 54,
    marginBottom: 10,
  },
  gameOverDesc: {
    fontSize: 18,
    color: '#059669',
    marginBottom: 6,
    textAlign: 'center',
  },
  gameOverScore: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 18,
  },
});