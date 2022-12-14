import React, {FC} from 'react';

import { styles } from './styles';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


interface EmptyStateInterface {
    Icon: () => JSX.Element,
    text: string,
}


const EmptyState: FC<EmptyStateInterface> = ({Icon, text}) => {

  const {theme} = useSelector((state: RootState) => state.ui);

  return (
    <View style={[
      styles.container,
      theme==='dark'?
        styles.containerDarkMode
      :
        styles.containerLightMode
      
      ]}>
      <Icon />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}


EmptyState.defaultProps = {
    text: 'EMPTY PAGE'
}

export default EmptyState;
