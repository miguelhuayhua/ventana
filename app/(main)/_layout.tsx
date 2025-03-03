import { router, Tabs } from 'expo-router';
import * as React from 'react';
import colors from 'tailwindcss/colors';
import { Book, Cylinder, Factory, Home, Store } from 'lucide-react-native';
import { Button } from '~/components/ui/button';
import { useSelector } from 'react-redux';
import { Text } from '~/components/ui/text';
import { View } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const items = useSelector((state: any) => state.item.items);
  console.log(items.length)
  return (

    <Tabs screenOptions={{
      tabBarLabelStyle: { fontWeight: 700 },
      tabBarActiveTintColor: colors.cyan["600"],
      tabBarInactiveTintColor: colors.gray["400"],
      headerRight: () =>
        <View className='relative'>
          <View className='h-6 w-6 flex items-center justify-center rounded-full bg-red-500 absolute top-0 right-2'>
            <Text className='text-white text-xs font-bold text-center '>
              {items.length}
            </Text>
          </View>
          <Button
            onPress={() => router.push({ pathname: '/book' })}
            className='mr-2' variant='ghost'>
            <Book color={colors.gray["600"]} />
          </Button>
        </View>
    }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Cotizar ventanas',
          tabBarLabel: 'Cotizar',
          tabBarIcon: (props) => <Home {...props} />,
        }}
      />
      <Tabs.Screen
        name='(empresas)'
        options={{
          tabBarLabel: 'Empresas',
          headerShown: false,
          tabBarIcon: (props) => <Factory {...props} />,
        }}
      />
      <Tabs.Screen
        name='(material)'

        options={{
          tabBarLabel: 'Materiales',
          tabBarIcon: (props) => <Cylinder {...props} />,
          headerShown: false
        }}
      />
    </Tabs>

  );
}