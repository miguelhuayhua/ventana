import * as React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Button } from '~/components/ui/button';
import {
    Card,
    CardContent,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { db } from '~/db/client';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { router } from 'expo-router';
import { Columns3, Cuboid, LayoutTemplate, Tally2, Tally3, Trash } from 'lucide-react-native';
import colors from 'tailwindcss/colors';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { remove_item } from '~/store/actions/items';
import { toast } from 'sonner-native';
import FacturaModal from './(cotizar)/factura_modal';
dayjs.locale('es');
export default function Screen() {
    const items = useSelector((state: any) => state.item.items) || [];
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <View style={{ flex: 1 }}  >
                <View className='px-6 flex-col gap-4' >
                    <Button className='my-4'
                        onPress={() => {
                            if (items.length === 0) {
                                toast.error('No hay items para cotizar');
                            }
                            else {
                                setOpen(true);
                            }
                        }}
                    >
                        <Text>
                            Generar cotización
                        </Text>
                    </Button>
                    <FlatList
                        ListEmptyComponent={<View>
                            <Text className='text-center'>
                                No hay items
                            </Text>
                        </View>}
                        data={items}
                        renderItem={({ item }) => (
                            <View className='flex-row border border-gray-100 rounded-lg my-2 p-2'
                                key={item.id}>
                                <View className='w-2/3 px-3'>
                                    <Text className='text-lg'>
                                        {item.item.nombre}
                                    </Text>
                                </View>
                                <View className='w-1/3 items-end'>
                                    <Text className='text-xl font-bold mb-3'>
                                        {item.item.precio} Bs.
                                    </Text>
                                    <Button
                                        onPress={() => {
                                            dispatch(remove_item(item.item.id));
                                            toast.success('Item eliminado');
                                        }}
                                        size='icon' variant='destructive'>
                                        <Trash color='white' size={17} />
                                    </Button>
                                </View>
                            </View>

                        )
                        }
                    />

                </View>
            </View>
            <FacturaModal data={{
                items: items.map((value: any) => {
                    return value.item
                }), porcentajeGanancia: 0, empresa: ''
            }} open={open} setOpen={setOpen} />
        </>

    );
}
