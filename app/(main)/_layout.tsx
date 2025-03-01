import { Tabs } from 'expo-router';
import * as React from 'react';
import colors from 'tailwindcss/colors';
import { Cylinder, Factory, Home } from 'lucide-react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {

  return (

    <Tabs screenOptions={{
      tabBarLabelStyle: { fontWeight: 700 },
      tabBarActiveTintColor: colors.cyan["600"],
      tabBarInactiveTintColor: colors.gray["400"]
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