import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Auth from './screens/Auth';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          {
            !isLoggedIn ? <Auth setLoggedIn={setLoggedIn} /> : <Navigation colorScheme={colorScheme} />
          }
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
