import { router } from 'expo-router';
import { ArrowRightCircle } from 'lucide-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import colors from 'tailwindcss/colors';
import { Button } from '~/components/ui/button';

import { Text } from '~/components/ui/text';

export default function Screen() {

    return (
        <ScrollView className='flex-1'>
            <View className='flex flex-col gap-5 p-6'>
                <Button
                    onPress={() => router.push('/(material)/(vidrio)/3mm')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        3mm
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>
                <Button
                    onPress={() => router.push('/(material)/(vidrio)/4mm')}
                    className='grow flex flex-row justify-between' variant='outline'>
                    <Text className='!text-xl font-bold'>
                        4mm
                    </Text>
                    <ArrowRightCircle color={colors.gray["600"]} />
                </Button>

            </View>
        </ScrollView>
    );
}
