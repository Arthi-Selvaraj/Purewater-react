// app/(screen)/_layout.tsx
import { Stack } from 'expo-router';

export default function ScreenLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal', // optional: makes it slide up
      }}
    />
  );
}
