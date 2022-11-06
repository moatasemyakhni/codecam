import { View, Text, TextInput } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../constants/palette'
import {styles} from './styles'

interface InputProps {
    error?: boolean,
    errorMessage?: string,
    placeholder?: string,
    label?: string,

}

const Input: FC<InputProps> = (props) => {
  return (
    <View>
        <Text style={[styles.label, props.error? styles.errorMessage: styles.labelText]}>
            {
                !props.error?(
                    props.label
                ): (
                    props.errorMessage
                )
            }
        </Text>
      <TextInput
        style={ [styles.input, props.error? styles.inputError: styles.inputErrorFree] }
        placeholder={props.placeholder}
        placeholderTextColor={colors.darkMode.white}
      />
    </View>
  )
}

Input.defaultProps = {
    placeholder: "Write Here...",
    label: "label",
    errorMessage: "something went wrong",
    error: false,
}

export default Input