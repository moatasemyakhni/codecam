import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { styles } from './styles'
import { StackNavigationProp } from '@react-navigation/stack';

interface HeaderProps {
  imageSrc?: string,
  extension?: string,
  title?: string,
  navigation?: StackNavigationProp<any>
  includeIcon?: boolean
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <View style={styles.container}>

        <Text style={styles.title}>{props.title}</Text>
        {
        props.includeIcon?
          <TouchableOpacity 
            onPress={
              () => {
              props.navigation.navigate('Setting')
              }
            }
          >
            {
              !props.imageSrc?
              <Image
                  source={require('../../../assets/images/icons/default-profile-sm.png')}
              />
              :
              <Image
                  source={{ 
                    uri: `data:image/${props.extension};base64,${props.imageSrc}`
                  }}
                  style={[styles.image, styles.smSize]}
              />
            }
          </TouchableOpacity>
    :
          <Text style={styles.smSize}></Text>
    }
    </View>
    
  )
}

Header.defaultProps = {
  includeIcon: true,
}

export default Header