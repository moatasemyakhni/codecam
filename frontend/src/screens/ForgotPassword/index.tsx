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
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { sendEmail } from '../../api/auth/authApi';
import { emailFormat } from '../../constants/utilities';


const ForgotPassword = () => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [enabled, setEnabled] = useState(false);

    const {theme} = useSelector((state: RootState) => state.ui);

    const handleChange = async () => {
      setEnabled(false)
      if(!emailFormat(email)) {
        setEnabled(true);
        setIsError(true);
        setMessage('Wrong email format');
        return;
      }
      const response = await sendEmail({email: email});
      if(response.error) {
        setEnabled(true);
        setIsError(true);
        setMessage(response.message);
        return;
      }

      setEnabled(true);
      setMessage(response.message);
      setEmail('');
    }

    useEffect(() => {
      setEnabled([email].every(Boolean));
    }, [email]);

    return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      enabled 
      style={[
        styles.forgotPasswordContainer,
        theme==='dark'?
          styles.containerBgColorDark
        :
          styles.containerBgColorLight
      ]}
    >
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