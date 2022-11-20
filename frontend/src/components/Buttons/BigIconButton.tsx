import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {styles} from './styles';

const BigIconButton = ({ title, onPress, Icon, darkTheme }) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[
          styles.iconBtn, 
          styles.bgIconBtn,
          darkTheme?
            styles.borderTextDarkMode
          :
            styles.borderTextLightMode
        ]}
    >
        <Icon />
        <Text style={[
          styles.iconText, 
          styles.bgIconText,
          darkTheme?
          (
            styles.textDarkMode
          )
          : 
          (
            styles.textLightMode
          )
          ]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default BigIconButton