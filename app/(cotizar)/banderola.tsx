import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
export default function Screen() {

    return (
        <View style={{ flex: 1 }}  >
            <Image style={[{ width: "100%", height: "100%", }, StyleSheet.absoluteFill]}
                source={require('../../assets/images/fondo.jpg')} />
            <ScrollView className='p-6' >


            </ScrollView>
        </View>

    );
}
