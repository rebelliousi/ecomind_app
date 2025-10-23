import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }} // Burada "index" header yerine "Home" görünür
      />
      {/* Diğer ekranlar */}
    </Stack>
  );
}