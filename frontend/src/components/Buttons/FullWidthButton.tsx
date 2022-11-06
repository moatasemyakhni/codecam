import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import {styles} from './styles'


interface FullWidthButtonProps {
    title?: string, 
    onPress?: () => void,
    BGRed?: boolean,
    BGBlue?: boolean,
    BGGreen?: boolean,
    BGPrimary?: boolean,
    enabled?: boolean
}

const FullWidthButton: FC<FullWidthButtonProps> = (props) => {
// an enabled prop will be passed once all fields become non-empty
  return (
    <View style={{ flex: 1, marginHorizontal: 10, }}>    
        <TouchableOpacity disabled={!props.enabled} onPress={ props.onPress }>
            <View style={ [styles.btn , props.BGRed? styles.btnBGRed: props.BGBlue? styles.btnBGBlue : props.BGGreen? styles.btnBGGreen: styles.btnBGPrimary, !props.enabled? styles.disabled:''] }>
                <Text style={styles.btnText}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

FullWidthButton.defaultProps = {
    onPress: () => {},
    title: 'Confirm',
    BGRed: false,
    BGBlue: false,
    BGGreen: false,
    BGPrimary: true,
    enabled: false,
}

export default FullWidthButton