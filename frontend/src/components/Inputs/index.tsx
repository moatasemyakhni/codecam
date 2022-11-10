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
}

const Input: FC<InputProps> = (props) => {

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
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
                placeholderTextColor={colors.darkMode.white}
                keyboardType='default'
                ref={props.ref}
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
}

export default Input