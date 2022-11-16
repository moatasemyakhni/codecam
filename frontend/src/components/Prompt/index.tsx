import React from 'react';
import { styles } from './styles';
import Dialog from "react-native-dialog";
import { colors } from '../../constants/palette';
import Toast from 'react-native-root-toast';

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
            <Dialog.Description style={{ color: colors.white, fontSize: 16 }}>
              {description}
            </Dialog.Description>
            <Dialog.Button style={styles.btnCancel} bold color={colors.white} label="CANCEL" onPress={handleCancel} />
            <Dialog.Button style={styles.btnAction} bold color={color} label={label} onPress={handleRun} />
          </Dialog.Container>
      );
}

export default Prompt;
