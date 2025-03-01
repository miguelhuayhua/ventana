import * as React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Button } from '~/components/ui/button';

import { Text } from '~/components/ui/text';
import { db } from '~/db/client';
import { empresas } from '~/db/schema';
import { Empresa } from '~/db/types';
import { RefreshControl } from 'react-native-gesture-handler';
import { router, useFocusEffect } from 'expo-router';
import { MoveRight } from 'lucide-react-native';
import { gray } from 'tailwindcss/colors';
export default function Screen() {

    const [Empresas, setEmpresas] = React.useState<Empresa[]>([]);
    const [loading, setLoading] = React.useState(false);
    const fetch = React.useCallback(() => {
        setLoading(true);
        db.select().from(empresas).then(data => {
            setEmpresas(data);
            setLoading(false);
        });
    }, []);
    useFocusEffect(fetch);

    return (
        <View className='p-6'>
            <Button onPress={() => { router.push('/(crear)/empresa') }}>
                <Text>
                    Añadir empresa
                </Text>
            </Button>
            <FlatList
                ListHeaderComponent={
                    <View className='py-4 border-b'>
                        <Text className='text-xl font-bold'>Empresas registradas</Text>
                    </View>
                }
                ListEmptyComponent={<View>
                    <Text className='text-center mt-6'>
                        Sin datos registrados
                    </Text>
                </View>}
                refreshControl={
                    <RefreshControl
                        onRefresh={() => {
                            fetch();
                        }}
                        refreshing={loading}
                    />}
                renderItem={empresa => (
                    <View className='py-4 flex flex-row items-center justify-between border-b border-b-gray-100'>
                        <Text className='text-xl'>
                            {empresa.item.nombre}
                        </Text>
                        <Button
                            onPress={() => {
                                router.push({ pathname: '/(main)/(empresas)/[id]', params: { id: empresa.item.id } })
                            }}
                            variant='outline' className='rounded-2xl'>
                            <MoveRight color={gray["500"]} size={18} />
                        </Button>
                    </View>
                )} data={Empresas} >

            </FlatList>
        </View>
    );
}
