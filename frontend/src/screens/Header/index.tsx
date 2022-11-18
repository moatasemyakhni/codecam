import React, { FC, useEffect } from 'react';

import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

interface HeaderProps {
  extension?: string,
  title?: string,
  navigation?: StackNavigationProp<any>
  includeIcon?: boolean
}

const Header: FC<HeaderProps> = (props) => {
  const { userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(userProfile);
    
  }, [])
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
              <Image
                  source={{ 
                    uri: userProfile.profileImage
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