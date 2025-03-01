import { Stack } from 'expo-router';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {


    return (
        <GestureHandlerRootView>
            <Stack>
                <Stack.Screen name="aluminio" options={{ title: 'Añadir Aluminio' }} />
                <Stack.Screen name="vidrio" options={{ title: 'Añadir Vidrio' }} />
                <Stack.Screen name="empresa" options={{ title: 'Añadir empresa' }} />
            </Stack>
        </GestureHandlerRootView>
    );
}

