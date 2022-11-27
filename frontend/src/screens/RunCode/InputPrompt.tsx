import React, { useState } from 'react';
import Dialog from "react-native-dialog";
import LoadingComponent from '../../components/LoadingComponent';

import { styles } from './styles';
import { View, Text } from 'react-native';
import { colors } from '../../constants/palette';
import { codeOutput } from '../../api/user/userApi';


const InputPrompt = ({visiblePrompt, setVisiblePrompt, languageValue, textContent, setOutput}) => {
    const [disable, setDisable] = useState(false);
    const [ShowLoadingProgress, setShowLoadingProgress] = useState(false);
    const [finishLoading, setFinishLoading] = useState(false);
    const handleCancel = () => {
        setVisiblePrompt(false);
    }
    const [inputValues, setInputValues] = useState('');
    const handleRun = async () => {
        try {
            setDisable(true);
            let input;
            if(!inputValues) {
                input = null;
            }else{ 
                const inputs = inputValues.split(' ').filter(val => val).join('\n');
                input = inputs;
            }
            const data = {
                source: textContent,
                language: languageValue,
                inputs: input,
            }
            setShowLoadingProgress(true);
            const response = await codeOutput(data);
            if(response.error) {
                response.message === "OK"? setOutput('Missing/Wrong type/s of an input/s') : setOutput(response.message);
                setDisable(false);
                setVisiblePrompt(false);
                return;
            }
            setFinishLoading(true);
            setOutput(response.output);
        } catch (error) {
            error.message === "OK"? setOutput('Missing/Wrong type of an input') : setOutput(error.message);
        }finally {
            setDisable(false);
            setVisiblePrompt(false);
            setShowLoadingProgress(false);
            setFinishLoading(false);
        }
        
    }


    return (
        !ShowLoadingProgress?
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
            <Dialog.Input 
                underlineColorAndroid={colors.white} 
                style={styles.white} 
                placeholderTextColor={colors.white} 
                onChangeText={(e) => setInputValues(e)} 
                value={inputValues} 
                placeholder='"John Smith"  20'
            />
            <Dialog.Button 
                disabled={disable? true : false} 
                bold 
                color={colors.white} 
                label="CLEAR INPUT" 
                onPress={() => setInputValues('')} 
            />
            <Dialog.Button 
                disabled={disable? true : false} 
                bold 
                color={colors.white} 
                label="GO BACK" 
                onPress={handleCancel} 
            />
            <Dialog.Button 
                disabled={disable? true : false} 
                bold 
                color={colors.white} 
                label="RUN" 
                onPress={handleRun} 
            />
          </Dialog.Container>
        :
            <LoadingComponent 
                title="Executing"
                endOfProgress={finishLoading}
                smallLoadingIcon
            /> 
      );
}

export default InputPrompt;
