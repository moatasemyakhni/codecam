import Input from '../../components/Inputs';
import React, { useState, useEffect } from 'react';
import LogoXL from '../../../assets/images/logos/LogoXL';
import FullWidthButton from '../../components/Buttons/FullWidthButton';

import { 
  View,
  Text,  
  Platform,
  ScrollView, 
  KeyboardAvoidingView,
} from 'react-native';
import { styles } from './styles';
import { emailFormat } from '../../constants/utilities';
import { sendEmail } from '../../api/auth/authApi';


const ForgotPassword = () => {
    

    return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled style={styles.forgotPasswordContainer}>
      <ScrollView>
        <View>

          <View style={styles.logoWrapper}>
              <LogoXL />
          </View>

          <View style={styles.form}>
            <Input
              inputGap
              label='Email'
              placeholder='Email...'
              error={isError}
              errorMessage={message}
              setError={setIsError}
              setVal={setEmail}
              val={email}
              setMessage={setMessage}

             />
            <FullWidthButton
              BGPrimary 
              title='Send Token'
              enabled={enabled}
              onPress={handleChange}  
            />
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