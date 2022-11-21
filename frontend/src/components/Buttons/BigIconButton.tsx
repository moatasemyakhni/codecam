import React, { FC } from 'react';

import { Text, TouchableOpacity } from 'react-native';
import {styles} from './styles';

interface BigIconButtonInterface {
  title?: string,
  darkTheme?: boolean,
  Icon?: () => JSX.Element
  onPress?: () => void
}

const BigIconButton: FC<BigIconButtonInterface> = ({ title, onPress, Icon, darkTheme }) => {
  // This component was created because IconButton could not handle big size svg components
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