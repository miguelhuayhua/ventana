import '~/global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { NAV_THEME } from '~/lib/constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    setAndroidNavigationBar("light"); // Fuerza el navbar a claro
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={LIGHT_THEME}>
        <StatusBar style="dark" /> 
        <Stack>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="(cotizar)" options={{ headerShown: false }} />
          <Stack.Screen name="(crear)" options={{ headerShown: false }} />
          <Stack.Screen name="(editar)" options={{ headerShown: false }} />
          <Stack.Screen name="index" />
        </Stack>
        <PortalHost />
        <Toaster />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
