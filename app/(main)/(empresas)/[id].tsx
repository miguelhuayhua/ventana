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
import { Pencil, Plus } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { toast } from 'sonner-native';
import { router, useLocalSearchParams } from 'expo-router';
import ObjectID from 'bson-objectid';
import { eq } from 'drizzle-orm';
dayjs.locale('es');
export default function Screen() {
    const { id } = useLocalSearchParams();
    const { control, handleSubmit, reset } = useForm<Empresa>({ defaultValues: { nombre: '', id: ObjectID().toHexString() } });
    React.useEffect(() => {
        db.select().from(empresas).where(eq(empresas.id, id.toString())).then(data => {
            reset(data[0]);
        })
    }, []);


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
                        toast.promise(db.update(empresas).set(data).where(
                            eq(empresas.id, data.id)
                        ), {
                            error: error => {
                                console.log(error)
                                return 'Ha ocurrido un error'
                            },
                            loading: 'Editando empresa...',
                            success: res => {
                                router.dismiss();
                                return 'Editado con éxito';
                            }
                        })
                    })} className='flex flex-row gap-2 mt-5'>
                    <Pencil size={18} color='white' />

                    <Text>
                        Editar empresa
                    </Text>
                </Button>

            </ScrollView>
        </View>

    );
}
