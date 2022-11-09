import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import LogoXL from '../../../assets/images/logos/LogoXL';
import {styles} from './styles';
import Input from '../../components/Inputs';
import FullWidthButton from '../../components/Buttons/FullWidthButton';

const LoginScreen = () => {
  return (
    
    <KeyboardAvoidingView behavior="padding">
      <ScrollView scrollEnabled >
        <View>
          <View style={styles.logoWrapper}>
            <LogoXL />
          </View>

          <View style={styles.form}>
            <Input label='Email' placeholder='Email...' />
            <View style={styles.gap}>
              <Input label='Password' placeholder='Password...' />
            </View>
            <View style={styles.gap}>
              <FullWidthButton title='LOGIN' />
            </View>
          </View>
          
          <View>
            <Text style={styles.links}>Signup</Text>
            <Text style={styles.links}>Forgot Password</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
