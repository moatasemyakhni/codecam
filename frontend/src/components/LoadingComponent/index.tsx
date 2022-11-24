import React, { useEffect, useState, FC } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

import {styles} from './style';
import { View } from 'react-native';
import { colors } from '../../constants/palette';

interface LoadingComponentInterface {
  endOfProgress?: boolean,
  smallLoadingIcon?: boolean,
  title?: string,
}

const LoadingComponent: FC<LoadingComponentInterface> = ({ endOfProgress, smallLoadingIcon, title}) => {

  const [value, setValue] = useState(97);
  const [duration, setDuration] = useState(10000);

  useEffect(() => {
    if(endOfProgress) {
      setValue(100);
      setDuration(0);
    }
  }, [endOfProgress]);

  return (
    <View style={[
      styles.container,
      smallLoadingIcon?
        styles.containerPositionForSm
      :
        styles.containerPositionForLg
    ]}>

      <CircularProgress
        radius={
          smallLoadingIcon?
            30
          :
            150
        }
        value={value}
        valueSuffix={'%'}
        activeStrokeColor={colors.primary}
        inActiveStrokeOpacity={0.2}
        duration={duration}
        title={title}
      />
    </View>
  );
}

LoadingComponent.defaultProps = {
  endOfProgress: false,
  smallLoadingIcon: false,
  title: '',
}

export default LoadingComponent