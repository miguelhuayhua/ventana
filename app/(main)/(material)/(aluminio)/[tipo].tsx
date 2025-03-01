import * as React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Button } from '~/components/ui/button';

import { Text } from '~/components/ui/text';
import { db } from '~/db/client';
import { aluminios, empresas } from '~/db/schema';
import { Aluminio, Empresa } from '~/db/types';
import { RefreshControl } from 'react-native-gesture-handler';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { MoveRight, PencilIcon } from 'lucide-react-native';
import { gray } from 'tailwindcss/colors';
import { eq } from 'drizzle-orm';
export default function Screen() {
    const { tipo } = useLocalSearchParams();
    const [Aluminios, setAluminios] = React.useState<Aluminio[]>([]);
    const [Empresas, setEmpresas] = React.useState<Empresa[]>();
    const [loading, setLoading] = React.useState(false);
    const fetch = React.useCallback(() => {
        setLoading(true);
        db.select().from(aluminios).where(
            eq(aluminios.tipo, tipo.toString())
        ).then(data => {
            setAluminios(data);
            setLoading(false);
        });
        db.select().from(empresas).then(data => {
            setEmpresas(data);
        })
    }, []);
    useFocusEffect(fetch);

    return (
        <View className='p-6'>
            <Button onPress={() => {
                router.push({ pathname: '/(crear)/aluminio', params: { aluminio: tipo.toString() } })
            }} >
                <Text>
                    Añadir aluminio {tipo}
                </Text>
            </Button>
            <FlatList
                ListHeaderComponent={
                    <View className='py-4 border-b'>
                        <Text className='text-xl font-bold text-capitalize'>Aluminios tipo - {tipo}</Text>
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
                renderItem={aluminio => (
                    <View className='py-4 flex flex-row items-center justify-between border-b border-b-gray-100'>
                        <View>
                            <Text className='text-xl'>
                                Línea: {aluminio.item.linea}
                            </Text>
                            <Text className='text-xl'>
                                Precio: {aluminio.item.precio} Bs.
                            </Text>
                            <Text className='text-xl capitalize'>
                                Color: {aluminio.item.color}
                            </Text>
                            <Text className='font-bold'>
                                Empresa: {Empresas?.find(value => value.id == aluminio.item.empresaId)?.nombre}
                            </Text>
                        </View>
                        <Button
                            onPress={() => {
                                router.push({ pathname: '/(editar)/aluminio', params: { aluminio: aluminio.item.id } })
                            }}
                            variant='outline' className='rounded-2xl'>
                            <PencilIcon color={gray["500"]} size={18} />
                        </Button>
                    </View>
                )} data={Aluminios} >

            </FlatList>
        </View>
    );
}
