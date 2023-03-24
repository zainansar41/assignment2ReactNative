import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'
import Login from './Screens/LoginSignup/Login';
import AddNote from './Screens/AddNote/AddNote';
import ViewNote from './Screens/ViewNotes/ViewNote';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="addnote"
            component={AddNote}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="viewNotes"
            component={ViewNote}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

