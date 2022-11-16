import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Text, View, TextInput, ScrollView } from "react-native";
import { allowedProgrammingLanguages, editorSupportedLanguages } from "../../constants/utilities";
import { AntDesign } from '@expo/vector-icons';
import CodeEditor from '@rivascva/react-native-code-editor';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import FullWidthButton from "../../components/Buttons/FullWidthButton";
import { styles } from "./styles";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { colors } from "../../constants/palette";
import InputPrompt from "./InputPrompt";
import Toast from 'react-native-root-toast';


 const RunCode = () => {
    const keyboard = useKeyboard();
    const languagePlaceHolder = { label: "Choose a Language...", value: null }
    const [chosenLanguage, setChosenLanguage] = useState(allowedProgrammingLanguages[0]);
    const [editorLanguage, setEditorLanguage] = useState(editorSupportedLanguages[0]);
    const [codeContent, setCodeContent] = useState('hello');
    const [output, setOutput] = useState(null);
    const [visiblePrompt, setVisiblePrompt] = useState(false);
    
    const [snippetName, setSnippetName] = useState(null);
    const onChange = (val) => {
        // console.log("change", val);
        
    }
    const saveCode = () => {
        Toast.show('Code is saved in History', {
            duration: Toast.durations.LONG,
            
        })
    }
    const showPrompt = () => {
        setVisiblePrompt(true);
    }
    const icon = () => (<AntDesign name="down" size={16} color={colors.white} />)

    const changeLanguage = (value, index) => {
        if(index != 0) {
            setChosenLanguage(allowedProgrammingLanguages[index-1])
            setEditorLanguage(editorSupportedLanguages[index-1])
        }else {
            setChosenLanguage(languagePlaceHolder)

        }
    }

    

     return (
        
        <ScrollView>
         <View style={styles.container}>
             <TextInput 
             style={ styles.snippetInput }
             value={snippetName || "Snippet"}
             placeholder={"Snippet Name..."}
             />
             <View style={styles.contentWrapper}>
                <RNPickerSelect
                    onValueChange={ changeLanguage }
                    items={ allowedProgrammingLanguages }
                    useNativeAndroidPickerStyle={false}
                    placeholder={languagePlaceHolder}
                    style={{ inputIOS: styles.inputIOS , inputAndroid: styles.inputAndroid, iconContainer:styles.iconContainer }}
                    value={chosenLanguage.value}
                    
                    
                    Icon={icon}
                />
                
                    <SafeAreaView >
                        <View style={styles.editorContainer}>
                            
                            <CodeEditor
                                style={{                           
                                    ...{
                                        fontSize: 18,
                                        inputLineHeight: 26,
                                        highlighterLineHeight: 26,

                                    },
                                    ...(keyboard.keyboardShown
                                        ? { marginBottom: keyboard.keyboardHeight - 200 }
                                        : {}),
                                }}
                                language={editorLanguage}
                                onChange={onChange}
                                initialValue={codeContent}
                                showLineNumbers
                            />
                            
                        </View>
                        <Text style={styles.outputTitle}>Output</Text>
                        <View style={styles.outputWrapper}>
                            <Text>
                                {output}
                            </Text>
                        </View>
                        <View style={styles.groupBtns}>
                            <FullWidthButton
                                groupBtn
                                BGBlue
                                enabled
                                title="Execute"
                                
                                onPress={showPrompt}
                                Icon={
                                    <FontAwesome5 name="play-circle" size={24} color={colors.white} />
                                }
                             />
                            <FullWidthButton
                                groupBtn
                                BGGreen
                                enabled
                                title="save"
                                onPress={saveCode}
                                Icon={
                                    <MaterialIcons name="save" size={24} color={colors.white} />
                                }
                            />
                        </View>
                
                    </SafeAreaView>
             </View>
         </View>
         
            <InputPrompt setVisiblePrompt={setVisiblePrompt} visiblePrompt={visiblePrompt} />
         </ScrollView>

     );
 }

 export default RunCode;


