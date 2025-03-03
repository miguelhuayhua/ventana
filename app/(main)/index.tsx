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
dayjs.locale('es');
export default function Screen() {

  return (
    <View style={{ flex: 1 }}  >
      <Image style={[{ width: "100%", height: "100%", }, StyleSheet.absoluteFill]}
        source={require('../../assets/images/fondo.jpg')} />
      <ScrollView className='p-6' >
        <BlurView className='p-4 rounded-lg mb-6 ' intensity={90} >
          <View >
            <Text className='text-2xl font-bold' >
              {
                dayjs().format('DD [de] MMMM [del] YYYY')}
            </Text>
            <Text className='text-lg'>
              Número de empresas registradas
            </Text>
          </View>
        </BlurView>
        <View className='flex flex-row gap-5 flex-wrap '>

          <Card className='grow max-w-sm pt-2 rounded-2xl'>

            <CardContent className='flex items-center'>
              <Tally2 style={{ marginLeft: 14 }} size={35} color={colors.gray["800"]} />
              <Text className='font-bold text-lg mb-2 text-center'>
                Ventana simple
              </Text>
              <Button onPress={() => {
                router.push('/(cotizar)/simple');
              }} variant='outline'>
                <Text>Seleccionar</Text>
              </Button>
            </CardContent>

          </Card>
          <Card className='grow max-w-sm pt-2 rounded-2xl'>

            <CardContent className='flex items-center'>
              <Tally3 style={{ marginLeft: 8 }} size={35} color={colors.gray["800"]} />
              <Text className='font-bold text-lg mb-2 text-center'>
                Ventana triple
              </Text>
              <Button
                onPress={() => {
                  router.push('/(cotizar)/triple');
                }}
                variant='outline'>
                <Text>Seleccionar</Text>
              </Button>
            </CardContent>

          </Card>
          <Card className='grow max-w-sm pt-2 rounded-2xl'>

            <CardContent className='flex items-center'>
              <Columns3 size={30} color={colors.gray["800"]} />

              <Text className='font-bold text-lg mb-2 text-center'>
                Banderola
              </Text>
              <Button variant='outline'>
                <Text>Seleccionar</Text>
              </Button>
            </CardContent>

          </Card>
          <Card className='grow max-w-sm pt-2 rounded-2xl'>

            <CardContent className='flex items-center'>
              <LayoutTemplate size={30} color={colors.gray["800"]} />
              <Text className='font-bold text-lg mb-2 text-center'>
                Vidrios
              </Text>
              <Button variant='outline'>
                <Text>Seleccionar</Text>
              </Button>
            </CardContent>

          </Card>
          <Card className='grow  pt-2 rounded-2xl'>

            <CardContent className='flex items-center'>
              <Cuboid size={30} color={colors.gray["800"]} />
              <Text className='font-bold text-lg mb-2 text-center'>
                Aluminios
              </Text>
              <Button variant='outline'>
                <Text>Seleccionar</Text>
              </Button>
            </CardContent>

          </Card>
        </View>

      </ScrollView>
    </View>

  );
}
