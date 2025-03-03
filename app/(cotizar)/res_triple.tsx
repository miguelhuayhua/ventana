import * as React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { useRef } from 'react';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import 'dayjs/locale/es';
import { Text } from '~/components/ui/text';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '~/components/ui/button';
import { File, Save } from 'lucide-react-native';
import colors from 'tailwindcss/colors';
import FacturaModal from './factura_modal';
import { useDispatch } from 'react-redux';
import { addItem } from '~/store/actions/items';
import { toast } from 'sonner-native';

const GROSOR_ZOCALO_20 = 5;
const GROSOR_ZOCALO_25 = 7;
dayjs.locale('es');
export default function Screen() {
    const dispatch = useDispatch();
    const data = useLocalSearchParams();
    const imageRef = useRef<ScrollView>(null);
    const viewRef = useRef<View>(null);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    if (status === null) {
        requestPermission();
    }
    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(viewRef, {
                height: 440,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                Alert.alert('Guardado', 'Guardado en galería',
                    [{ text: 'Aceptar' }]
                );
            }
        } catch (e) {
            console.log(e);
        }
    };
    //longitudes 
    let total = + ((+data.precio_gancho)
        + (+data.precio_jamba)
        + (+data.precio_parante)
        + (+data.precio_riel_inf)
        + (+data.precio_riel_sup)
        + (+data.precio_socalo)
        + (+data.precio_socalo_c)
        + (+data.precio_vidrio)
        + (+data.longitud_goma * 1.5)
        + (+data.nro_rodamientos * 2.5)
        + (10 + 22)
        + (data.nroCorredizas == '1' ? +data.precio_union : 0)
        + (+data.longitud_felpa)).toFixed(0);
    let total_mano_obra = +(total * +data.porcentajeGanancia).toFixed(0);
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <View    >
                <Image style={[{ width: "100%", height: "100%", }, StyleSheet.absoluteFill]}
                    source={require('../../assets/images/fondo.jpg')} />
                <ScrollView className='px-6 ' ref={imageRef}  >
                    <Button
                        onPress={() => {
                            setOpen(true);
                        }}
                        variant='outline' className='flex flex-row gap-3 my-6 bg-white' >
                        <File color={colors.gray["600"]} size={18} />
                        <Text>
                            Generar factura
                        </Text>
                    </Button>
                    <Button
                        onPress={onSaveImageAsync}
                        variant='outline' className='flex flex-row gap-3 mb-6 bg-white' >
                        <Save color={colors.gray["600"]} size={18} />
                        <Text>
                            Capturar en imagen
                        </Text>
                    </Button>
                    <ViewShot style={{ backgroundColor: 'white', padding: 20, marginBottom: 20, borderRadius: 12, elevation: 5, shadowColor: '#444' }} ref={viewRef} >
                        <Text className='text-2xl text-center font-bold mb-4' >
                            Resumen de cotización
                        </Text>
                        <Text className='text-xl font-bold'>
                            Aluminios
                        </Text>
                        <Text className='text-lg'>
                            {`Parantes: ${data.des_parante} cm x ${6 - (+data.nroCorredizas * 2)} = ${data.precio_parante} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            {`Ganchos: ${data.des_gancho} cm x ${+data.nroCorredizas * 2} = ${data.precio_gancho} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            {`Sócalos: ${data.des_socalo} cm x ${6 - (+data.nroCorredizas)} & ${+data.des_socalo + 2} cm x ${data.nroCorredizas} = ${+data.precio_socalo + (+data.precio_socalo_c)} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            {`Jamba: ${data.des_jamba} cm x 2 = ${data.precio_jamba} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            {`Riel superior: ${data.des_riel_sup} cm x 1 = ${data.precio_riel_sup} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            {`Riel inferior: ${data.des_riel_inf} cm x 1 = ${data.precio_riel_inf} Bs.`}
                        </Text>
                        {
                            data.nroCorredizas == '1' ?
                                <Text className='text-lg'>
                                    {`Unión de hoja: ${data.des_parante} cm x 1 = ${data.precio_union} Bs.`}
                                </Text>
                                : null
                        }
                        <Text className='text-xl font-bold'>
                            Vidrio
                        </Text>
                        <Text className='text-lg'>
                            3 piezas de {(+data.des_socalo + 1.2).toFixed(1)} x {((+data.des_parante - 2 * (data.linea == '20' ? GROSOR_ZOCALO_20 : GROSOR_ZOCALO_25) + 1.2)).toFixed(1)} cm
                        </Text>
                        <Text className='text-lg'>
                            Área a cubrir: {data.area_vidrio} cm2 = {data.precio_vidrio} Bs.
                        </Text>
                        <Text className='text-xl font-bold'>
                            Materiales extras
                        </Text>
                        <Text className='text-lg'>
                            Longitud de goma: {`${data.longitud_goma} m = ${+data.longitud_goma * 1.5} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            Nro. de rodamientos: {data.nro_rodamientos} unidades = {+data.nro_rodamientos * 2.5} Bs.
                        </Text>
                        <Text className='text-lg'>
                            Picos de loro: {data.nroCorredizas} unidades
                        </Text>
                        <Text className='text-lg'>
                            Cinta felpa: {`${data.longitud_felpa} m = ${+data.longitud_felpa * 1} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            Tornillos:100 unidades = 10 Bs.
                        </Text>
                        <Text className='text-lg'>
                            Silicona: 1 unidad = 22 Bs
                        </Text>
                        <Text>
                            ---------------------------------------------------------------------
                        </Text>
                        <Text className='text-xl'>
                            Total mano de obra: {total_mano_obra} Bs.
                        </Text>
                        <Text className='text-xl'>
                            Total materiales: {total} Bs.
                        </Text>
                        <Text className='text-xl font-bold'>
                            Total: {total + total_mano_obra} Bs.
                        </Text>
                    </ViewShot>
                    <View className='flex flex-row gap-5 mb-6'>
                        <Button
                            onPress={() => router.dismiss()}
                            variant='outline' className='grow bg-white' >
                            <Text>
                                Volver
                            </Text>
                        </Button>
                        <Button
                            onPress={() => {
                                dispatch(addItem({ nombre: 'Ventana triple (3 hojas)', precio: total + total_mano_obra }));
                                toast.success('Agregado a hoja');
                            }}
                            className='grow' >
                            <Text>
                                Agregar a hoja
                            </Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
            <FacturaModal open={open} setOpen={setOpen} data={{
                items: [{
                    alto: +data.alto,
                    ancho: +data.ancho,
                    nombre: 'Ventana triple (3 hojas)',
                    precio: total + total_mano_obra,

                }],
                empresa: data.empresa.toString(),
                porcentajeGanancia: +data.porcentajeGanancia
            }} />
        </>

    );
}
