import Input from '../../components/Inputs';
import React, {useState, useEffect} from 'react';
import FullWidthButton from '../../components/Buttons/FullWidthButton';

import { 
  View, 
  Platform,
  ScrollView, 
  KeyboardAvoidingView, 
} from 'react-native';

import { 
  comparePasswords, 
  emailFormat,
  passwordStrength,
  validName,
} from '../../constants/utilities';
import { styles } from './styles';
import { store } from '../../redux/store';
import { signup } from '../../api/auth/authApi';
import { getUserInfo } from '../../api/user/userApi';
import { updateUserProfile } from '../../redux/slices/userSlice';


const Signup = () => {

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const [emailMessage, setEmailMessage] = useState('');
  const [fullNameMessage, setFullNameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled([email, fullName, password, passwordConfirm].every(Boolean));
  }, [email, fullName, password, passwordConfirm]);


    return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      enabled   
      keyboardVerticalOffset={100} 
      style={styles.signupContainer}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input 
            label='Email'
            placeholder='Email...'
            error={emailError}
            errorMessage={emailMessage}
            setError={setEmailError}
            setMessage={setEmailMessage}
            setVal={setEmail}
            val={email}
            />
          <Input 
            inputGap 
            label='Fullname' 
            placeholder='Fullname...'
            error={fullNameError}
            errorMessage={fullNameMessage}
            setError={setFullNameError}
            setMessage={setFullNameMessage}
            setVal={setFullName}
            val={fullName}
          />
          <Input 
            isPassword 
            label='Password' 
            placeholder='Password...'
            error={passwordError}
            errorMessage={passwordMessage}
            setError={setPasswordError}
            setMessage={setPasswordMessage}
            setVal={setPassword}
            val={password}
            />
          <Input 
            isPassword 
            inputGap 
            label='Confirm Password' 
            placeholder='Confirm Password...' 
            error={passwordConfirmError}
            errorMessage={passwordConfirmMessage}
            setError={setPasswordConfirmError}
            setMessage={setPasswordConfirmMessage}
            setVal={setPasswordConfirm}
            val={passwordConfirm}
          />
          <FullWidthButton
            BGPrimary 
            title='signup'
            enabled={enabled}
            onPress={handleSignup}
            />  
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
    )
}
export default Signup;