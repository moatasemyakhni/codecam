import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {styles} from './styles';

const BigIconButton = ({ title, onPress, Icon }) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.iconBtn, styles.bgIconBtn]}
    >
        <Icon />
        <Text style={[styles.iconText, styles.bgIconText]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default BigIconButton