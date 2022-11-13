import { Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '../../constants/palette';


interface IconButtonProps {
    title?: string,
    onPress?: () => void
    icon?: keyof typeof Entypo.glyphMap,
    color?: string,
    size?:number,
}

const IconButton: FC<IconButtonProps> = ({ title, onPress, icon, color }) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={styles.iconBtn}
    >
        <Entypo 
            name={icon}
            size={20}
            color={color}
        />
        <Text style={styles.iconText}>{title}</Text>
    </TouchableOpacity>
  )
}

IconButton.defaultProps = {
    title: 'Needs Permission',
    icon: 'emoji-sad',
    color: colors.white,
    onPress: () => {}


}

export default IconButton