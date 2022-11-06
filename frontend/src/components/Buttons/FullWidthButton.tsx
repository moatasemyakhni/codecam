import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import {styles} from './styles'


interface FullWidthButtonProps {
    title?: string, 
    onPress?: () => void,
}

const FullWidthButton: FC<FullWidthButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={ props.onPress }>
        <View style={styles.container}>
            <Text style={styles.fullWidth}>
                {props.title}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

FullWidthButton.defaultProps = {
    onPress: () => {},
    title: 'Confirm',
}

export default FullWidthButton