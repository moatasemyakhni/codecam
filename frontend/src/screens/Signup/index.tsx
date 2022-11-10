import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import Input from '../../components/Inputs'
import FullWidthButton from '../../components/Buttons/FullWidthButton'
import { styles } from './styles'
const Signup = () => {

    return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled   keyboardVerticalOffset={100} style={styles.signupContainer}>
      <ScrollView>
          <View style={styles.form}>
            <Input label='Email' placeholder='Email...' />
            <Input inputGap label='Fullname' placeholder='Fullname...' />
            <Input isPassword label='Password' placeholder='Password...' />
            <Input isPassword inputGap label='Confirm Password' placeholder='Confirm Password...' />
            <FullWidthButton BGPrimary title='signup' />
            
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
}
export default Signup