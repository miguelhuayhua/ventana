import { Stack } from 'expo-router';
import * as React from 'react';
export default function Layout() {


    return (
        <Stack>
            <Stack.Screen name="aluminio"
                options={{
                    title: 'Editar aluminio'
                }} />
            <Stack.Screen name="vidrio"
                options={{
                    title: 'Editar vidrio'
                }} />
        </Stack>
    );
}
