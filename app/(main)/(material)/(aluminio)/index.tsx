import { router } from 'expo-router';
import { ArrowRightCircle } from 'lucide-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { Button } from '~/components/ui/button';

import { Text } from '~/components/ui/text';

const GITHUB_AVATAR_URI =
    'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {

    return (
        <ScrollView className='flex-1'>
            <View className='flex flex-col gap-5 p-6'>
                <Button
                    onPress={() => router.push('/(material)/(aluminio)/socalo')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Sócalo
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(material)/(aluminio)/jamba')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Jamba
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(material)/(aluminio)/gancho')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Gancho
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(material)/(aluminio)/parante')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Parante
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(material)/(aluminio)/inferior')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Riel inferior
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(material)/(aluminio)/superior')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Riel superior
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(material)/(aluminio)/union')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Unión de hoja
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
            </View>
        </ScrollView>
    );
}
