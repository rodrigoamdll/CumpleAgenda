import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthProvider'; // Ruta correcta
import DrawerNavigator from './src/navigation/DrawerNavigator'; // Ruta correcta

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
