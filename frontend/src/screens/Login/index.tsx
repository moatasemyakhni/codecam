import React from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LogoXL from '../../../assets/images/logos/LogoXL'
import Input from '../../components/Inputs'
import FullWidthButton from '../../components/Buttons/FullWidthButton'
import { styles } from './styles'


const Login = () => {
    const navigation = useNavigation();
    return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled style={styles.loginContainer}>
      <ScrollView>
        <View>

          <View style={styles.logoWrapper}>
              <LogoXL />
          </View>
      
          <View style={styles.form}>
            <Input label='Email' placeholder='Email...' />
            <Input isPassword inputGap label='Password' placeholder='Password...' />
            <FullWidthButton BGPrimary title='Login' />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.links, styles.linkTopPadding]}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                <Text style={styles.links}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
}
export default Login