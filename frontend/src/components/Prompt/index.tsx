import React from 'react';
import Dialog from "react-native-dialog";
import Toast from 'react-native-root-toast';

import { styles } from './styles';
import { Platform } from 'react-native';
import { colors } from '../../constants/palette';

const Prompt = ({visiblePrompt, setVisiblePrompt, title, description, bgColor, color, onSuccessMessage, label, onAction}) => {
    const handleCancel = () => {
        setVisiblePrompt(false);
    }
    
    const handleRun = () => {
      Toast.show(onSuccessMessage, {
          duration: Toast.durations.LONG,
      })
        onAction();
        setVisiblePrompt(false);
    }
    return (
          <Dialog.Container contentStyle={{backgroundColor: bgColor}}  visible={visiblePrompt} >
            <Dialog.Title style={styles.promptTitle}>{title}</Dialog.Title>
            <Dialog.Description style={styles.promptDescription}>
              {description}
            </Dialog.Description>
            <Dialog.Button 
              style={Platform.OS == 'ios'? {} : styles.btnCancel} 
              bold 
              color={colors.white} 
              label="CANCEL" 
              onPress={handleCancel} 
            />
            <Dialog.Button 
              style={Platform.OS == 'ios'? {} : styles.btnAction} 
              bold 
              color={color} 
              label={label} 
              onPress={handleRun} 
            />
          </Dialog.Container>
      );
}

export default Prompt;
