import { Stack } from 'expo-router';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {


    return (
        <GestureHandlerRootView>
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Seleccione el tipo' }} />
                <Stack.Screen name="[tipo]" options={{ title: 'Ver vidrio' }} />
            </Stack>
        </GestureHandlerRootView>
    );
}
