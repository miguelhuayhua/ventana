import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import ObjectId from 'bson-objectid';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Empresa, Aluminio } from '~/db/types';
import { db } from '~/db/client';
import { aluminios, empresas } from '~/db/schema';
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
    const { aluminio } = useLocalSearchParams();
    const { control, handleSubmit, setValue, reset, watch } = useForm<Aluminio & { Empresa: Empresa }>();
    const [Empresas, setEmpresas] = React.useState<Empresa[]>([]);
    React.useEffect(() => {
        db.select().from(empresas).then(data => {
            setEmpresas(data);
            db.select().from(aluminios).where(
                eq(aluminios.id, aluminio.toString()))
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
                                    <SelectLabel>Seleccione el color del aluminio </SelectLabel>
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
                                        placeholder='Introduzca el valor del Aluminio'
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
                        name='linea'
                        render={({ field, fieldState }) => (
                            <Select className='mt-4'
                                onValueChange={(id) => {
                                    field.onChange(id?.value);
                                }} >
                                <Text className='text-xl font-bold mb-2'>
                                    Línea
                                </Text>
                                <SelectTrigger  >
                                    <Text className='text-lg capitalize'>
                                        {field.value}
                                    </Text>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectLabel>Seleccione la línea </SelectLabel>
                                    <SelectItem
                                        label={'Línea 20'}
                                        value={"20"}
                                    />
                                    <SelectItem
                                        label={'Línea 25'}
                                        value={"25"}
                                    />
                                </SelectContent>
                            </Select>
                        )} />
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
                            toast.promise(db.update(aluminios)
                                .set({ ...newData, createdAt: dayjs().unix() }).
                                where(eq(aluminios.id, data.id)), {
                                error: error => {
                                    console.log(error)
                                    return 'Ha ocurrido un error'
                                },
                                loading: 'Editando aluminio',
                                success: res => {
                                    router.dismiss();
                                    return 'Editado con éxito';
                                }
                            })
                        })} className='flex flex-row gap-2 mt-5'>
                        <PencilIcon size={16} color='white' />
                        <Text>
                            Editar aluminio
                        </Text>
                    </Button>
                    <Button
                        variant='destructive'
                        onPress={() => {
                            toast.promise(
                                db.delete(aluminios).where(eq(aluminios.id, aluminio.toString())),
                                {
                                    error: 'Ha ocurrido un error',
                                    loading: 'Eliminando aluminio...',
                                    success: () => {
                                        router.replace('/(main)/(material)')
                                        return 'Eliminado con éxito';
                                    }
                                }
                            );
                        }}
                        className='flex flex-row gap-2 mt-5'>
                        <Text>
                            Eliminar aluminio
                        </Text>
                    </Button>

                </ScrollView>
            </View>

        );

    }
}
