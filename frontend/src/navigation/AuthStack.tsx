import React from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/palette';
import { NavigationContainer } from "@react-navigation/native";


const AuthStack = () => {

  const Stack = createStackNavigator();
    
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Auth environment */}
        <Stack.Group>
          <Stack.Screen  
            name="Login" 
            component={Login} 
            options={{ 
              headerShown: false 
            }} 
          />

        <Stack.Screen  
          name="Signup" 
          component={Signup} 
          options={{ 
            headerStyle: {backgroundColor: colors.primary, height: 96},
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontSize: 24
            },
            headerTintColor: colors.white,
          }} 
        />

        <Stack.Screen  
          name="Forgot Password" 
          component={ForgotPassword} 
          options={{ 
            headerStyle: {backgroundColor: colors.primary, height: 96},
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontSize: 24
            },
            headerTintColor: colors.white,
          }} 
        />
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AuthStack