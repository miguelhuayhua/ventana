import * as React from 'react';
import { ScrollView, View } from 'react-native';
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
import { Columns3, Cuboid, LayoutTemplate, Tally2, Tally3 } from 'lucide-react-native';
import colors from 'tailwindcss/colors';
import { useSelector, useStore } from 'react-redux';
dayjs.locale('es');
export default function Screen() {
    const items = useSelector((state: any) => state.item.items);
    console.log(items)
    return (
        <View style={{ flex: 1 }}  >

            <ScrollView className='p-6' >
                {
                    items.map((value: any) => (
                        <View>
                            <Text>
                                {value.item.nombre}
                            </Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>

    );
}
