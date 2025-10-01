import { Stack } from 'expo-router';

export default function CharacterNavigator() {
  return (
    <>
      <Stack>
        <Stack.Screen name="characterInfo" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
