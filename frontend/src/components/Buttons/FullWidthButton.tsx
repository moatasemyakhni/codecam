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
    groupBtn?: boolean,
    Icon?: JSX.Element,
    onPress?: () => void,
}

const FullWidthButton: FC<FullWidthButtonProps> = (props) => {
    // if icon inserted, it will be after text
  return (
    <View style={!props.groupBtn?styles.btnWrapper: styles.groupBtn}>    
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
                    {!props.Icon?
                        
                        <Text style={styles.btnText}>
                            {props.title}
                        </Text>
                    :
                        <View style={styles.container}>
                            <Text></Text>
                            <Text style={styles.btnText}>
                            {props.title}
                            </Text>
                            {props.Icon}
                        </View>

                    }
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
    groupBtn: false,
    Icon: null,
}

export default FullWidthButton