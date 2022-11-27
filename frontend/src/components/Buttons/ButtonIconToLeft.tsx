import { Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import React, { FC, useEffect } from 'react';
import { styles } from './styles';


interface ButtonIconToLeft {
    Icon?: () => JSX.Element,
    onPress?: () => void,
    styleContainer?: Array<ViewStyle>
    styleText?: Array<TextStyle>,
    text?: string,
}

const ButtonIconToLeft: FC<ButtonIconToLeft> = ({Icon, onPress, styleContainer, styleText, text}) => {
    
  return (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.iconBtn, ...styleContainer]}
    >
        <Icon />
        <Text
            style={[styles.iconText, ...styleText]}
        >
            {text}
        </Text>
    </TouchableOpacity>
  )
}

ButtonIconToLeft.defaultProps = {
    styleContainer: [],
    styleText: [],
    text: '',
    onPress: () => null,
    Icon: () => null,
}

export default ButtonIconToLeft