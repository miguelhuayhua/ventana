import { Stack } from 'expo-router';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {


    return (
        <GestureHandlerRootView>
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Listado de Materiales' }} />
                <Stack.Screen name="(aluminio)" options={{ headerShown: false }} />
                <Stack.Screen name="(vidrio)" options={{ headerShown: false }} />
            </Stack>
        </GestureHandlerRootView>
    );
}
