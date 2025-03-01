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
            <View className='flex flex-row gap-5 p-6'>
                <Button
                    onPress={() => router.push('/(main)/(material)/(vidrio)')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Vidrios
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(main)/(material)/(aluminio)')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        Aluminios
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>

            </View>
        </ScrollView>
    );
}
