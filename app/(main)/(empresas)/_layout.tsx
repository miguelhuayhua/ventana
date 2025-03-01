import { Stack } from 'expo-router';
import * as React from 'react';
export default function Layout() {


    return (
        <Stack>
            <Stack.Screen name="index"
                options={{
                    title: 'Listado de empresas',
                }} />
            <Stack.Screen name="[id]"
                options={{
                    title: 'Editar empresa'
                }} />
        </Stack>
    );
}
