import React, { FC } from 'react';

import { 
  View, 
  Text, 
  Keyboard,
  TextInput, 
  TouchableWithoutFeedback, 
} from 'react-native';
import {styles} from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { colors } from '../../constants/palette';

interface InputProps {
    error?: boolean,
    errorMessage?: string,
    placeholder?: string,
    label?: string,
    inputGap?: boolean,
    isPassword?: boolean,
    val?: string|null,
    setVal?: (e: string|null) => void,
    setError?: (e: boolean) => void,
    setMessage?: (e: string|null) => void,
}

const Input: FC<InputProps> = (props) => {

  const {theme} = useSelector((state: RootState) => state.ui);
  
  const handleChange = (e) => {
    props.setError(false);
    props.setMessage('');
    props.setVal(e);
  }
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          
        <View  style={props.inputGap? styles.inputGap:null}>
            <Text style={[styles.label, props.error? styles.errorMessage: styles.labelText]}>
                {
                    !props.error?(
                        props.label
                    ): (
                      
                        props.errorMessage
                        
                    )
                }
            </Text>
              <View>
                <TextInput
                  style={[
                    styles.input, props.error? 
                      styles.inputError
                    : 
                      styles.inputErrorFree,
                    
                    theme === 'dark'? 
                      styles.inputTextColorDark
                    :
                      styles.inputTextColorLight,

                  ]}
                  placeholder={props.placeholder}
                  placeholderTextColor={theme === 'dark'? colors.white : colors.gray}
                  keyboardType='default'
                  onChangeText={handleChange}
                  secureTextEntry={props.isPassword? true: false}
                  value={props.val}
                />
              </View>
          </View>
        </TouchableWithoutFeedback>
  )
}

Input.defaultProps = {
    placeholder: "Write Here...",
    label: "label",
    errorMessage: "something went wrong",
    error: false,
    isPassword: false,
}

export default Input