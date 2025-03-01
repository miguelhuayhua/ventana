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

dayjs.locale('es');
export default function Screen() {
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

    let total = +((+data.precio_gancho) + (+data.precio_jamba) + (+data.precio_parante) + (+data.precio_riel_inf) + (+data.precio_riel_sup) + (+data.precio_socalo) + (+data.precio_socalo_c) + (+data.precio_vidrio));
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <View style={{ flex: 1 }}  >
                <Image style={[{ width: "100%", height: "100%", }, StyleSheet.absoluteFill]}
                    source={require('../../assets/images/fondo.jpg')} />
                <ScrollView className='p-6' ref={imageRef}  >
                    <Button
                        onPress={() => {
                            setOpen(true);
                        }}
                        variant='outline' className='flex flex-row gap-3 mb-6 bg-white' >
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
                            {`Parantes: ${data.des_parante} cm x 2 = ${data.precio_parante} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            {`Ganchos: ${data.des_gancho} cm x 2 = ${data.precio_gancho} Bs.`}
                        </Text>
                        <Text className='text-lg'>
                            {`Sócalos: ${data.des_socalo} cm x 3 & ${+data.des_socalo + 2} cm x 1 = ${+data.precio_socalo + (+data.precio_socalo_c)} Bs.`}
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
                        <Text className='text-xl font-bold'>
                            Vidrio
                        </Text>
                        <Text className='text-lg'>
                            Área a cubrir: {data.area_vidrio} m2 = {data.precio_vidrio} Bs.
                        </Text>
                        <Text className='text-xl font-bold'>
                            Materiales extras
                        </Text>
                        <Text className='text-lg'>
                            Longitud de goma: {+(data.longitud_goma) / 100} m
                        </Text>
                        <Text className='text-lg'>
                            Longitud de felpa: {data.longitud_felpa} m
                        </Text>
                        <Text className='text-lg'>
                            Nro. de rodamientos: {data.nro_rodamientos} unidades
                        </Text>
                        <Text className='text-lg'>
                            Picos de loro: {data.nro_picos} unidades
                        </Text>
                        <Text>
                            ---------------------------------------------------------------------
                        </Text>
                        <Text className='text-xl'>
                            Total mano de obra: {total * +data.porcentajeGanancia} Bs.
                        </Text>
                        <Text className='text-xl'>
                            Total materiales: {total} Bs.
                        </Text>
                        <Text className='text-xl font-bold'>
                            Total: {total + total * +data.porcentajeGanancia} Bs.
                        </Text>
                    </ViewShot>
                    <View className='flex flex-row gap-5'>
                        <Button
                            onPress={() => router.dismiss()}
                            variant='outline' className='grow bg-white' >
                            <Text>
                                Volver
                            </Text>
                        </Button>
                        <Button className='grow' >
                            <Text>
                                Agregar a hoja
                            </Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
            <FacturaModal open={open} setOpen={setOpen} data={{
                ventanas: [{
                    alto: +data.alto,
                    ancho: +data.ancho,
                    nombre: 'Ventana simple 2 hojas',
                    precio: total
                }],
                empresa: data.empresa.toString()
            }} />
        </>

    );
}
