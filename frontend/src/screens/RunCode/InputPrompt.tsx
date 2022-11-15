import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import Dialog from "react-native-dialog";
import { colors } from '../../constants/palette';


const InputPrompt = ({visiblePrompt, setVisiblePrompt}) => {

    const handleCancel = () => {
        setVisiblePrompt(false);
    }
    const [inputValues, setInputValues] = useState('');
    const handleRun = () => {
        // call api
        if(!inputValues) {
            console.log("null");
            
        }else{ 
            const inputs = inputValues.split(' ').filter(val => val).join('\n');
            console.log(inputs);
        }
        setVisiblePrompt(false);
    }

    const clearInput = () => {
        setInputValues('')
    }
    return (
          <Dialog.Container contentStyle={styles.promptContainer}  visible={visiblePrompt} >
            <Dialog.Title style={styles.promptTitle}>Code Inputs</Dialog.Title>
            <Dialog.Description style={{ color: colors.white, fontSize: 16 }}>
              if exists, enter input values, respectively, separated by spaces:
            </Dialog.Description>
            <Dialog.Description >
                <View>
                    <Text style={[ styles.promptDescription, styles.descriptionTitle]}>Python Example:</Text>
                    <View style={styles.codeSnippet}>
                        <Text style={styles.promptDescription}>name = <Text style={styles.yellow}>input</Text>("Enter name: ")</Text>
                        <Text style={styles.promptDescription}>age = <Text style={styles.red}>int(</Text><Text style={styles.yellow}>input</Text>("Enter age: ")<Text style={styles.red}>)</Text></Text>
                    </View>
                </View>
            </Dialog.Description>
            <Dialog.Input underlineColorAndroid={colors.white} style={styles.white} placeholderTextColor={colors.white} onChangeText={(e) => setInputValues(e)} value={inputValues} placeholder='"John Smith"  20'/>
            <Dialog.Button bold color={colors.white} label="CLEAR INPUT" onPress={clearInput} />
            <Dialog.Button bold color={colors.white} label="GO BACK" onPress={handleCancel} />
            <Dialog.Button bold color={colors.white} label="RUN" onPress={handleRun} />
          </Dialog.Container>
      );
}

export default InputPrompt
