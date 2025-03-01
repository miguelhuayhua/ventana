import { Stack } from 'expo-router';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {


    return (
        <Stack>
            <Stack.Screen name="simple" options={{ title: 'Cotizar ventana simple' }} />
            <Stack.Screen name="banderola" />
            <Stack.Screen name="res_simple" options={{ title: 'Resultados ventana simple' }} />
            <Stack.Screen name="res_triple" options={{ title: 'Resultados ventana triple' }} />
            <Stack.Screen name="triple" options={{ title: 'Cotizar ventana triple' }} />
        </Stack>
    );
}
