import * as React from 'react';
import { ScrollView, View } from 'react-native';
import ObjectId from 'bson-objectid';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Empresa, Vidrio } from '~/db/types';
import { db } from '~/db/client';
import { vidrios, empresas } from '~/db/schema';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { toast } from 'sonner-native';
import { Pencil, PencilIcon, Plus } from 'lucide-react-native';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from '~/components/ui/select';
import { eq } from 'drizzle-orm';
dayjs.locale('es');
export default function Screen() {
    const { vidrio } = useLocalSearchParams();
    const { control, handleSubmit, setValue, reset, watch } = useForm<Vidrio & { Empresa: Empresa }>();
    const [Empresas, setEmpresas] = React.useState<Empresa[]>([]);
    React.useEffect(() => {
        db.select().from(empresas).then(data => {
            setEmpresas(data);
            db.select().from(vidrios).where(
                eq(vidrios.id, vidrio.toString()))
                .then(data2 => {
                    reset({ ...data2[0], Empresa: data.find(value => value.id == data2[0].empresaId) });
                });
        });

    }, []);

    if (watch('id')) {
        return (
            <View style={{ flex: 1 }}  >
                <ScrollView className='p-6' >
                    <Text className='text-2xl text-center font-bold mb-2'>
                        Tipo - <Text className='capitalize text-2xl text-cyan-600'>{watch('tipo')}</Text>
                    </Text>
                    <Controller
                        control={control}
                        name='color'
                        render={({ field, fieldState }) => (
                            <Select className='mt-4'
                                onValueChange={(id) => {
                                    field.onChange(id?.value);
                                }} >
                                <Text className='text-xl font-bold mb-2'>
                                    Color
                                </Text>
                                <SelectTrigger>
                                    <Text className='text-lg capitalize'>
                                        {field.value}
                                    </Text>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectLabel>Seleccione el color del vidrio </SelectLabel>
                                    <SelectItem
                                        label={'Bronce'}
                                        value={"bronce"}
                                    />
                                    <SelectItem
                                        label={'Negro'}
                                        value={"negro"}
                                    />
                                    <SelectItem
                                        label={'Plateado'}
                                        value={"plateado"}
                                    />
                                </SelectContent>
                            </Select>
                        )} />
                    <Controller
                        name='precio'
                        control={control}
                        render={({ field }) => {
                            return (
                                <>
                                    <Text className='text-xl font-bold mb-2 mt-3'>{`Precio:`}</Text>
                                    <Input
                                        placeholder='Introduzca el valor del Vidrio'
                                        value={field.value.toString()}
                                        inputMode='numeric'
                                        onChangeText={value => { field.onChange(+value) }}
                                    />
                                </>
                            )
                        }}
                    />
                  
                    <Controller
                        control={control}
                        name='Empresa.nombre'
                        render={({ field, fieldState }) => (
                            <Select className='mt-4'
                                onValueChange={(id) => {
                                    let empresa = Empresas.find(value => value.id == id?.value)!;
                                    setValue('Empresa', empresa);
                                    setValue('empresaId', empresa?.id);
                                }} >
                                <Text className='text-xl font-bold mb-2'>
                                    Empresas
                                </Text>
                                <SelectTrigger  >
                                    <Text className='text-lg capitalize'>
                                        {field.value}
                                    </Text>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectLabel>Seleccione la empresa </SelectLabel>
                                    {Empresas.map((empresa) => (
                                        <SelectItem
                                            key={empresa.id}
                                            label={empresa.nombre}
                                            value={empresa.id}
                                        />
                                    ))}
                                </SelectContent>
                            </Select>
                        )} />
                    <Button
                        onPress={handleSubmit(data => {
                            let { Empresa, ...newData } = data;
                            toast.promise(db.update(vidrios)
                                .set({ ...newData, createdAt: dayjs().unix() }).
                                where(eq(vidrios.id, data.id)), {
                                error: error => {
                                    console.log(error)
                                    return 'Ha ocurrido un error'
                                },
                                loading: 'Editando vidrio',
                                success: res => {
                                    router.dismiss();
                                    return 'Editado con éxito';
                                }
                            })
                        })} className='flex flex-row gap-2 mt-5'>
                        <PencilIcon size={16} color='white' />
                        <Text>
                            Editar vidrio
                        </Text>
                    </Button>
                    <Button
                        variant='destructive'
                        onPress={() => {
                            toast.promise(
                                db.delete(vidrios).where(eq(vidrios.id, vidrio.toString())),
                                {
                                    error: 'Ha ocurrido un error',
                                    loading: 'Eliminando vidrio...',
                                    success: () => {
                                        router.replace('/(main)/(material)')
                                        return 'Eliminado con éxito';
                                    }
                                }
                            );
                        }}
                        className='flex flex-row gap-2 mt-5'>
                        <Text>
                            Eliminar vidrio
                        </Text>
                    </Button>

                </ScrollView>
            </View>

        );

    }
}
