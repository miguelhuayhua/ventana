import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { db } from '~/db/client';
import { aluminios, empresas, vidrios } from '~/db/schema';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Empresa } from '~/db/types';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner-native';
import { and, eq } from 'drizzle-orm';
import { roundToNearest } from '~/lib/utils';
dayjs.locale('es');
//CONSTANTES 
const HOJAS = 3;
const GROSOR_ZOCALO_20 = 4.8;
const GROSOR_ZOCALO_25 = 6.5;
//PRECIOS
let JAMBA = 0;
let SOCALO = 0;
let UNION = 0;
let PARANTE = 0;
let GANCHO = 0;
let RIEL_SUP = 0;
let RIEL_INF = 0;
//DESCUENTOS 
let des_jamba = 0;
let des_socalo = 0;
let des_parante = 0;
let des_gancho = 0;
let des_riel_sup = 0;
let des_riel_inf = 0;

export default function Screen() {
    const { control, watch, handleSubmit, setValue } =
        useForm<{
            ancho: number,
            alto: number,
            linea: string,
            colorVidrio: string,
            colorAluminio: string,
            tipoVidrio: string,
            Empresa?: Empresa,
            nroCorredizas: number,
            porcentajeGanancia: number
        }>({
            defaultValues: {
                ancho: 0, alto: 0,
                linea: "20",
                tipoVidrio: "3mm",
                colorVidrio: "bronce",
                colorAluminio: "bronce",
                nroCorredizas: 1,
                porcentajeGanancia: 0.5
            }
        });
    const [Empresas, setEmpresas] = React.useState<Empresa[]>([]);
    React.useEffect(() => {
        db.select().from(empresas).then(data => {
            setEmpresas(data);
            setValue('Empresa', data[0]);
        })
    }, []);
    return (

        <ScrollView className='px-6' >
            <Controller
                control={control}
                name='porcentajeGanancia'
                render={({ field }) => (
                    <Select className='mt-4' onValueChange={(value) => {
                        field.onChange(+(value!.value))
                    }} >
                        <Text className='text-xl font-bold mb-2'>
                            Porcentaje de ganancia
                        </Text>
                        <SelectTrigger  >
                            <Text className='text-lg capitalize'>
                                {field.value}
                            </Text>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Seleccione el tipo de trabajo</SelectLabel>
                            <SelectItem
                                label={"Fabricación"}
                                value={"0.3"}
                            />
                            <SelectItem
                                label={"Fabricación e instalación"}
                                value={"0.5"}
                            />
                            <SelectItem
                                label={"Proyecto personalizado"}
                                value={"1.1"}
                            />
                        </SelectContent>
                    </Select>
                )} />
            <Controller
                control={control}
                name='nroCorredizas'
                render={({ field }) => (
                    <Select className='mt-4' onValueChange={(value) => {
                        field.onChange(+(value!.value))
                    }} >
                        <Text className='text-xl font-bold mb-2'>
                            Nro. Corredizas
                        </Text>
                        <SelectTrigger  >
                            <Text className='text-lg capitalize'>
                                {field.value}
                            </Text>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Seleccione el número de corredizas</SelectLabel>
                            <SelectItem
                                label={"1"}
                                value={"1"}
                            />
                            <SelectItem
                                label={"2"}
                                value={"2"}
                            />
                        </SelectContent>
                    </Select>
                )} />
            <Controller
                name='ancho'
                control={control}
                render={({ field }) => {
                    return (
                        <>
                            <Text className='text-xl font-bold my-2'>{`Ancho de ventana (cm):`}</Text>
                            <Input
                                placeholder='Introduzca el ancho de la ventana'
                                value={field.value.toString()}
                                onChangeText={value => { field.onChange(value) }}
                                inputMode='numeric'
                                aria-labelledby='inputLabel'
                                aria-errormessage='inputError'
                            />
                        </>
                    )
                }}
            />

            <Controller
                name='alto'
                control={control}
                render={({ field }) => {
                    return (
                        <>
                            <Text className='text-xl font-bold my-2'>
                                {`Alto de ventana (cm):`}
                            </Text>
                            <Input
                                placeholder='Introduzca el alto de la ventana'
                                value={field.value.toString()}
                                onChangeText={value => { field.onChange(value) }}
                                inputMode='numeric'
                            />
                        </>
                    )
                }}
            />
            <Controller
                control={control}
                name='Empresa.nombre'
                render={({ field, fieldState }) => (
                    <Select className='mt-4' onValueChange={(id) => {
                        let empresa = Empresas.find(value => value.id == id?.value);
                        setValue('Empresa', empresa);
                    }} >
                        <Text className='text-xl font-bold mb-2'>
                            Material de empresa
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
            <Controller
                control={control}
                name='colorAluminio'
                render={({ field, fieldState }) => (
                    <Select className='mt-4' onValueChange={(id) => {
                        let empresa = Empresas.find(value => value.id == id?.value);
                        setValue('Empresa', empresa);
                    }} >
                        <Text className='text-xl font-bold mb-2'>
                            Color Aluminio
                        </Text>
                        <SelectTrigger  >
                            <Text className='text-lg capitalize'>
                                {field.value}
                            </Text>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Seleccione tipo de vidrio</SelectLabel>
                            <SelectItem
                                label={"Bronce"}
                                value={"bronce"}
                            />
                            <SelectItem
                                label={"Transparente"}
                                value={"transparente"}
                            />
                        </SelectContent>
                    </Select>
                )} />
            <Controller
                control={control}
                name='linea'
                render={({ field, fieldState }) => (
                    <Select className='mt-4' onValueChange={value => field.onChange(value?.value)} >
                        <Text className='text-xl font-bold mb-2'>
                            Seleccione la línea
                        </Text>
                        <SelectTrigger  >
                            <Text className='text-lg capitalize'>
                                Línea: {field.value}
                            </Text>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Seleccione la empresa </SelectLabel>
                            <SelectItem
                                label={"Línea 20"}
                                value={"20"}
                            />
                            <SelectItem
                                label={"Línea 25"}
                                value={"25"}
                            />
                        </SelectContent>
                    </Select>
                )} />

            <Controller
                control={control}
                name='tipoVidrio'
                render={({ field, fieldState }) => (
                    <Select className='mt-4'
                        onValueChange={(value) => {
                            field.onChange(value?.value)
                        }} >
                        <Text className='text-xl font-bold mb-2'>
                            Tipo vidrio
                        </Text>
                        <SelectTrigger  >
                            <Text className='text-lg capitalize'>
                                {field.value}
                            </Text>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Seleccione la empresa </SelectLabel>
                            <SelectItem
                                label={"3mm"}
                                value={"3mm"}
                            />
                            <SelectItem
                                label={"4mm"}
                                value={"4mm"}
                            />
                        </SelectContent>
                    </Select>
                )} />
            <Controller
                control={control}
                name='colorVidrio'
                render={({ field, fieldState }) => (
                    <Select className='mt-4' onValueChange={(id) => {
                        let empresa = Empresas.find(value => value.id == id?.value);
                        setValue('Empresa', empresa);
                    }} >
                        <Text className='text-xl font-bold mb-2'>
                            Color Vidrio
                        </Text>
                        <SelectTrigger  >
                            <Text className='text-lg capitalize'>
                                {field.value}
                            </Text>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Seleccione tipo de vidrio</SelectLabel>
                            <SelectItem
                                label={"Bronce"}
                                value={"bronce"}
                            />
                            <SelectItem
                                label={"Transparente"}
                                value={"transparente"}
                            />
                        </SelectContent>
                    </Select>
                )} />
            <Button
                className='mt-6 mb-4'
                onPress={handleSubmit(data => {
                    if (data.Empresa) {
                        db.select().from(aluminios)
                            .where(and(eq(aluminios.empresaId, data.Empresa?.id!), eq(aluminios.linea, data.linea), eq(aluminios.color, data.colorAluminio)))
                            .then((aluminio) => {
                                db.select().from(vidrios).where(and(eq(vidrios.empresaId, data.Empresa?.id!), eq(vidrios.tipo, data.tipoVidrio), eq(vidrios.color, data.colorVidrio)))
                                    .then((vidrio) => {
                                        GANCHO = aluminio.find(value => value.tipo == 'gancho')?.precio!;
                                        JAMBA = aluminio.find(value => value.tipo == 'jamba')?.precio!;
                                        PARANTE = aluminio.find(value => value.tipo == 'parante')?.precio!;
                                        SOCALO = aluminio.find(value => value.tipo == 'socalo')?.precio!;
                                        RIEL_SUP = aluminio.find(value => value.tipo == 'superior')?.precio!;
                                        RIEL_INF = aluminio.find(value => value.tipo == 'inferior')?.precio!;
                                        UNION = aluminio.find(value => value.tipo == 'union')?.precio!;
                                        des_gancho = roundToNearest(data.alto - (data.linea == "20" ? 2.4 : 3), 0.05);
                                        des_jamba = data.alto - 0;
                                        des_parante = roundToNearest(data.alto - (data.linea == "20" ? 2.4 : 3), 0.05);
                                        des_socalo = roundToNearest(+((data.ancho - (data.linea == "20" ? 1.2 : 2) - (data.linea == "20" ? (data.nroCorredizas == 2 ? 20.5 : 13.8) : (data.nroCorredizas == 2 ? 17.2 : 24.2))) / HOJAS).toFixed(2), 0.05);
                                        des_riel_sup = roundToNearest(+(data.ancho - (data.linea == "20" ? 1.2 : 2)).toFixed(2), 0.05);
                                        des_riel_inf = roundToNearest(+(data.ancho - (data.linea == "20" ? 1.2 : 2)).toFixed(2), 0.05);
                                        //precios
                                        let precio_gancho = (GANCHO * ((des_gancho * data.nroCorredizas * 2) / 600)).toFixed(0);
                                        let precio_socalo = (SOCALO * ((des_socalo * (6 - data.nroCorredizas)) / 600)).toFixed(0);
                                        let precio_socalo_c = (SOCALO * (((des_socalo + 2) * data.nroCorredizas) / 600)).toFixed(0);
                                        let precio_riel_inf = (RIEL_INF * (((des_riel_sup) * 1) / 600)).toFixed(0);
                                        let precio_jamba = (JAMBA * (((des_jamba) * 2) / 600)).toFixed(0);
                                        let precio_riel_sup = (RIEL_SUP * (((des_riel_inf) * 1) / 600)).toFixed(0);
                                        let precio_parante = (PARANTE * ((des_parante * (6 - data.nroCorredizas * 2)) / 600)).toFixed(0);
                                        let longitud_goma = (((((des_parante - 2 * 5 + 1.2) * 2) + ((des_socalo + 1.2) * 2)) * HOJAS) / 100).toFixed(0);
                                        let nro_rodamientos = data.nroCorredizas * 2;
                                        let precio_union = (UNION * des_parante / 600).toFixed(0);
                                        let nro_picos = data.nroCorredizas;
                                        let longitud_felpa = (((des_socalo * 6) * 2 + data.nroCorredizas * des_gancho + 2 * des_jamba) / 100).toFixed(0);
                                        let area_vidrio = +(((des_socalo + 2.4) * (des_parante - 2 * (data.linea == '20' ? GROSOR_ZOCALO_20 : GROSOR_ZOCALO_25) + 2.4)) * HOJAS).toFixed(2);
                                        let precio_vidrio = +(area_vidrio / 90000 * vidrio[0].precio).toFixed(1);
                                        router.push({
                                            pathname: '/(cotizar)/res_triple', params: {
                                                GANCHO,
                                                JAMBA,
                                                PARANTE,
                                                SOCALO,
                                                RIEL_SUP,
                                                RIEL_INF,
                                                des_gancho,
                                                des_jamba,
                                                des_parante,
                                                des_socalo,
                                                des_riel_inf,
                                                des_riel_sup,
                                                precio_gancho,
                                                precio_socalo,
                                                precio_jamba,
                                                precio_socalo_c,
                                                precio_riel_inf,
                                                precio_riel_sup,
                                                precio_parante,
                                                longitud_goma,
                                                nro_rodamientos,
                                                area_vidrio,
                                                precio_vidrio,
                                                nro_picos,
                                                ancho: data.ancho,
                                                alto: data.alto,
                                                linea: data.linea,
                                                colorVidrio: data.colorVidrio,
                                                colorAluminio: data.colorAluminio,
                                                tipoVidrio: data.tipoVidrio,
                                                longitud_felpa,
                                                empresa: data.Empresa?.nombre,
                                                nroCorredizas: data.nroCorredizas,
                                                porcentajeGanancia: data.porcentajeGanancia,
                                                precio_union
                                            }
                                        })
                                    });
                            }).catch(error => {
                                console.log(error)
                            });
                    }
                    else {
                        toast.error('Seleccione una empresa')
                    }
                })}>
                <Text>
                    Empezar cotización
                </Text>
            </Button>
        </ScrollView >


    );
}
