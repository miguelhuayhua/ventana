import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import ObjectId from 'bson-objectid';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Empresa } from '~/db/types';
import { db } from '~/db/client';
import { empresas } from '~/db/schema';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Plus } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { toast } from 'sonner-native';
import { router } from 'expo-router';
import ObjectID from 'bson-objectid';
dayjs.locale('es');
export default function Screen() {
    const { control, handleSubmit } = useForm<Empresa>({ defaultValues: { nombre: '', id: ObjectID().toHexString() } });

    return (
        <View style={{ flex: 1 }}  >

            <ScrollView className='p-6' >
                <Controller
                    name='nombre'
                    control={control}
                    render={({ field }) => {
                        return (
                            <>
                                <Text className='text-xl font-bold mb-2'>{`Nombre:`}</Text>
                                <Input
                                    placeholder='Introduzca nombre de empresa'
                                    value={field.value}
                                    onChangeText={value => { field.onChange(value) }}
                                />
                            </>
                        )
                    }}
                />

                <Button
                    onPress={handleSubmit(data => {
                        toast.promise(db.insert(empresas).values(data), {
                            error: error => {
                                console.log(error)
                                return 'Ha ocurrido un error'
                            },
                            loading: 'Agregando empresa...',
                            success: res => {
                                router.replace('/(main)/empresas')
                                return 'Creado con éxito';
                            }
                        })
                    })} className='flex flex-row gap-2 mt-5'>
                    <Plus size={18} color='white' />

                    <Text>
                        Registrar empresa
                    </Text>
                </Button>

            </ScrollView>
        </View>

    );
}
