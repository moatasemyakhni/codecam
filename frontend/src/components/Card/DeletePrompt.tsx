import React from 'react'
import { styles } from './styles'
import Dialog from "react-native-dialog";
import { colors } from '../../constants/palette';
import Toast from 'react-native-root-toast';

const DeletePrompt = ({visiblePrompt, setVisiblePrompt}) => {

    const handleCancel = () => {
        setVisiblePrompt(false);
    }
    
    const handleRun = () => {
        // call api
        Toast.show('Code Deleted Successfully', {
            duration: Toast.durations.LONG,
        })
        setVisiblePrompt(false);
    }
    return (
          <Dialog.Container contentStyle={styles.promptContainer}  visible={visiblePrompt} >
            <Dialog.Title style={styles.promptTitle}>Delete Code</Dialog.Title>
            <Dialog.Description style={{ color: colors.white, fontSize: 16 }}>
              Are you sure you want to delete code?
            </Dialog.Description>
            <Dialog.Button style={styles.btnCancel} bold color={colors.white} label="CANCEL" onPress={handleCancel} />
            <Dialog.Button style={styles.btnDelete} bold color={colors.red} label="DELETE" onPress={handleRun} />
          </Dialog.Container>
      );
}

export default DeletePrompt
