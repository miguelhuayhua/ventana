import dayjs from 'dayjs';
import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import colors from 'tailwindcss/colors';
import { Button } from '~/components/ui/button';
import { Alert } from 'react-native';
import {
    Dialog,
    DialogContent,
    DialogTitle
} from '~/components/ui/dialog';
import { Text } from '~/components/ui/text';
import { formatCurrency } from '~/lib/utils';
import * as MediaLibrary from 'expo-media-library';

interface Props {
    open: boolean;
    setOpen: any;
    data: {
        items: { nombre: string, precio: number }[],
        empresa?: string,
        porcentajeGanancia?: number
    };
}

export default function FacturaModal({ open, setOpen, data }: Props) {

    // Referencia para la captura de PDF si lo necesitas más adelante
    const facturaRef = React.useRef(null);
    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(facturaRef, {
                height: 440,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                Alert.alert('Guardado', 'Cotización guardado en la galería',
                    [{ text: 'Aceptar' }]
                );
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className='w-[300px]'>
                <DialogTitle>Detalles cotización</DialogTitle>
                <ScrollView className='bg-white py-5 px-8 pb-12' ref={facturaRef} >
                    {/* Componentes de factura integrados directamente */}
                    <View className='flex flex-col items-center'>
                        <Text className='font-bold text-2xl'>AVM</Text>
                        <Text className='text-xs'>Aluminio Vidrio y Melamina</Text>
                        <Text className='text-xs text-center'>
                            Dirección: Villa Tunari, Av. 23 de Marzo, Una cuadra antes de Av. Ayo Ayo, Nro 104
                        </Text>

                    </View>

                    <Text className='font-bold text-center my-2'>Cotización</Text>
                    <Text className='text-center text-xs' >{dayjs().format('DD [de] MMMM [del] YYYY - HH:mm:ss')}</Text>
                    <View className='border-t w-full border-t-gray-200 mt-3' />

                    <View className='mt-1'>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Servicio</Text>
                            <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'right' }]}>Precio</Text>
                        </View>

                        <ScrollView style={styles.tableBody}>
                            {data.items.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={2} ellipsizeMode="tail">
                                        {item.nombre}
                                    </Text>
                                    <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>
                                        {
                                            formatCurrency(+item.precio.toFixed(0))
                                        } Bs.
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.divider} />
                    <View style={styles.grandTotal}>
                        <Text className='text-center font-bold text-2xl'>Total: {formatCurrency(+data.items.reduce((acc, item) => acc + item.precio, 0).toFixed(0))} Bs.
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.footer}>
                        {
                            data.empresa && (
                                <Text className='text-xs text-center'>
                                    {`Material aluminio: ${data.empresa}`}
                                </Text>
                            )
                        }
                        {
                            data.porcentajeGanancia && (
                                <Text className='text-xs'>
                                    {`${data.porcentajeGanancia == 0.3 ?
                                        '(Solo fabricación)' :
                                        data.porcentajeGanancia == 0.5 ?
                                            '(Fabricado y colocado)' : '(Instalación personalizada)'}`}
                                </Text>
                            )
                        }
                    </View>
                </ScrollView>
                <Button onPress={onSaveImageAsync}>
                    <Text>Imprimir</Text>
                </Button>
            </DialogContent>
        </Dialog>
    );
}

// Estilos para los componentes de la factura
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    companyInfo: {
        fontSize: 12,
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
    },
    customerInfo: {
        marginBottom: 8,
    },
    customerText: {
        fontSize: 12,
        marginBottom: 2,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderStyle: 'dashed',
        marginVertical: 8,
    },
    table: {
        marginVertical: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray["200"],
        paddingBottom: 4,
        marginBottom: 4,
    },
    tableHeaderCell: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tableBody: {
        maxHeight: 100, // Limitar altura para prevenir que sea demasiado largo
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 2,
    },
    tableCell: {
        fontSize: 12,
    },
    totals: {
        alignItems: 'flex-end',
        marginVertical: 8,
    },
    totalItem: {
        fontSize: 12,
        marginVertical: 1,
    },
    grandTotal: {
        alignItems: 'center',
        marginVertical: 8,
    },
    grandTotalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentInfo: {
        alignItems: 'center',
        marginVertical: 8,
    },
    paymentText: {
        fontSize: 12,
    },
    footer: {
        alignItems: 'center',
        marginTop: 8,
    },
    footerText: {
        fontSize: 12,
    }
});