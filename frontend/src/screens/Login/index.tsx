import Input from '../../components/Inputs';
import React, {useState, useEffect} from 'react';
import LogoXL from '../../../assets/images/logos/LogoXL';
import FullWidthButton from '../../components/Buttons/FullWidthButton';

import { 
  View, 
  Text, 
  Platform,
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
} from 'react-native';
import { styles } from './styles';
import { store } from '../../redux/store';
import { login } from '../../api/auth/authApi';
import { getUserInfo } from '../../api/user/userApi';
import { emailFormat } from '../../constants/utilities';
import { updateUserProfile } from '../../redux/slices/userSlice';


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled([email, password].every(Boolean));
  }, [email, password])

  


    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        enabled 
        style={styles.loginContainer}
      >
        <ScrollView>
          <View>

            <View style={styles.logoWrapper}>
                <LogoXL />
            </View>
        
            <View style={styles.form}>
              <Input 
                error={emailError} 
                setError={setEmailError}
                errorMessage={emailMessage}  
                setMessage={setEmailMessage}
                val={email} 
                setVal={setEmail} 
                label='Email' 
                placeholder='Email...' 
              />
              <Input 
                val={password} 
                setError={setPasswordError}
                error={passwordError}
                errorMessage={passwordMessage}
                setVal={setPassword} 
                setMessage={setPasswordMessage}
                isPassword 
                inputGap 
                label='Password' 
                placeholder='Password...' 
              />
              <FullWidthButton enabled={enabled} BGPrimary title='Login' onPress={loginUser} />
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