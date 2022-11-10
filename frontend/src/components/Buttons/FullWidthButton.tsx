import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import {styles} from './styles'


interface FullWidthButtonProps {
    title?: string, 
    BGRed?: boolean,
    BGBlue?: boolean,
    BGGreen?: boolean,
    BGPrimary?: boolean,
    enabled?: boolean,
    onPress?: () => void,
}

const FullWidthButton: FC<FullWidthButtonProps> = (props) => {
// an enabled prop will be passed once all fields become non-empty
  return (
    <View style={styles.btnWrapper}>    
        <TouchableOpacity
            disabled={!props.enabled} 
            onPress={ props.onPress }
            >
            <View 
                style={ [
                    styles.btn , 
                    props.BGRed? styles.btnBGRed: props.BGBlue? styles.btnBGBlue : props.BGGreen? styles.btnBGGreen: styles.btnBGPrimary,
                    !props.enabled? styles.disabled:null
                ] }
            >
                <Text style={styles.btnText}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

// if no color is selected, button will be colored with the primary color
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