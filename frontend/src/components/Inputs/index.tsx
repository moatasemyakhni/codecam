import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../constants/palette'
import {styles} from './styles'

interface InputProps {
    error?: boolean,
    errorMessage?: string,
    placeholder?: string,
    label?: string,
    ref?: any,
    inputGap?: boolean,
    isPassword?: boolean,
}

const Input: FC<InputProps> = (props) => {

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
                  style={ [styles.input, props.error? styles.inputError: styles.inputErrorFree] }
                  placeholder={props.placeholder}
                  placeholderTextColor={colors.white}
                  keyboardType='default'
                  ref={props.ref}
                  secureTextEntry={props.isPassword? true: false}
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