import { View, Image } from 'react-native';
import React from 'react';
import {styles} from './style';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <Image
      style={styles.image} 
        source={
            require('../../../assets/images/loading.gif')
        }
      />
    </View>
  )
}

export default LoadingComponent