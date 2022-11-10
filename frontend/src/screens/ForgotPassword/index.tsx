import React, { useState } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import LogoXL from '../../../assets/images/logos/LogoXL'
import Input from '../../components/Inputs'
import FullWidthButton from '../../components/Buttons/FullWidthButton'
import { styles } from './styles'
import { useEffect } from 'react'


const ForgotPassword = () => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled style={styles.forgotPasswordContainer}>
      <ScrollView>
        <View>

          <View style={styles.logoWrapper}>
              <LogoXL />
          </View>

          <View style={styles.form}>
            <Input inputGap label='Email' placeholder='Email...' />
            <FullWidthButton BGPrimary title='Send Token' />
            <Text style={[
                styles.linkTopPadding,
                styles.statusMessage, 
                styles.linkTopPadding, message?isError? styles.error: styles.success:null
                ]}
            >
                {message}
            </Text>
    
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
}

export default ForgotPassword