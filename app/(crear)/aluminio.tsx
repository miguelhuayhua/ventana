import * as React from 'react';
import { ScrollView, View } from 'react-native';
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
import { Plus } from 'lucide-react-native';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from '~/components/ui/select';
dayjs.locale('es');
export default function Screen() {
    const { aluminio } = useLocalSearchParams();
    const { control, handleSubmit, setValue } = useForm<Aluminio & { Empresa: Empresa }>
        ({
            defaultValues: {
                id: ObjectId().toHexString(),
                nombre: '',
                precio: 0,
                tipo: aluminio.toString(),
                color: 'bronce',
                linea: '20',
            }
        });
    const [Empresas, setEmpresas] = React.useState<Empresa[]>([]);
    React.useEffect(() => {
        db.select().from(empresas).then(data => {
            setEmpresas(data);
            setValue('Empresa', data[0]);
            setValue('empresaId', data[0].id);
        })
    }, []);
    return (
        <View style={{ flex: 1 }}  >
            <ScrollView className='p-6' >
                <Text className='text-2xl text-center font-bold mb-2'>
                    Tipo - <Text className='capitalize text-2xl text-cyan-600'>{aluminio}</Text>
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
                                    onChangeText={value => { field.onChange(value) }}
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
                        toast.promise(db.insert(aluminios)
                            .values({
                                ...newData,
                                createdAt: dayjs().unix()
                            }), {
                            error: error => {
                                console.log(error)
                                return 'Ha ocurrido un error'
                            },
                            loading: 'Creando material',
                            success: res => {
                                router.dismiss();
                                return 'Creado con éxito';
                            }
                        })
                    })} className='flex flex-row gap-2 mt-5'>
                    <Plus size={18} color='white' />
                    <Text>
                        Agregar aluminio
                    </Text>
                </Button>

            </ScrollView>
        </View>

    );
}
