import InputPrompt from "./InputPrompt";
import Toast from 'react-native-root-toast';
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import FullWidthButton from "../../components/Buttons/FullWidthButton";

import { styles } from "./styles";
import { 
    Text, 
    View, 
    TextInput, 
    ScrollView 
} from "react-native";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../../constants/palette";
import { useKeyboard } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { editPhotoById, savePhoto } from "../../api/photo/photoApi";
import { addPhoto, updateUserPhotos } from "../../redux/slices/userSlice";
import { allowedProgrammingLanguages, editorSupportedLanguages } from "../../constants/utilities";


 const RunCode = ({route, navigation}) => {
    const keyboard = useKeyboard();
    const {photoId, newPhoto, language, textContent, photoSnippetName, base64Photo} = route.params;
    const languagePlaceHolder = { label: "Choose a Language...", value: null };
    const [chosenLanguage, setChosenLanguage] = useState(allowedProgrammingLanguages[0]);
    const [editorLanguage, setEditorLanguage] = useState(editorSupportedLanguages[0]);
    const [codeContent, setCodeContent] = useState(textContent);
    const [output, setOutput] = useState(null);
    const [visiblePrompt, setVisiblePrompt] = useState(false);
    const [enable, setEnable] = useState(true);
    const [snippetName, setSnippetName] = useState(photoSnippetName);
    const {userCodePhotos, userProfile} = useSelector(state => state.user);

    const {theme} = useSelector(state => state.ui)
    useEffect(() => {
        console.log("theme = ", theme);
        
        if(!newPhoto) {
            let currentLanguageIndex = 0;
            allowedProgrammingLanguages.forEach((lang, index) => {
                if(lang.value.toUpperCase() === language.toUpperCase()) {
                    currentLanguageIndex = index;
                    return;
                }
            });

            setChosenLanguage(allowedProgrammingLanguages[currentLanguageIndex]);
            setEditorLanguage(editorSupportedLanguages[currentLanguageIndex]);
        }
    }, [photoId]);

    const saveCode = async () => {
        try {
            setEnable(false);
            const data = {
                codeTextContent: codeContent,
                programmingLanguage: chosenLanguage.value,
                snippetName: snippetName
            };
            if(!newPhoto) {
                const response = await editPhotoById(photoId, data)
                if(response.error) {
                    Toast.show(response.message, {
                        duration: Toast.durations.LONG,
                    });
                    setEnable(true);
                    return;
                }
                const photos = userCodePhotos.filter(item => item._id !== photoId);
                const photo = response.photo;
                console.log(photos, "PHOTOS");
                
                store.dispatch(updateUserPhotos({
                    userCodePhotos: photos
                }))
                store.dispatch(addPhoto({
                    photo,
                }))
                
                Toast.show('Code Saved Successfully', {
                    duration: Toast.durations.LONG,
                });
                
            }else {
                const savePhotoResponse = await savePhoto({
                    base64Photo: base64Photo,
                    codeTextContent: codeContent,
                    programmingLanguage: allowedProgrammingLanguages[0].value,
                    snippetName: snippetName,
                    userId: userProfile.userId,
                });
    
                if(savePhotoResponse.error) {
                    Toast.show(savePhotoResponse.message, {
                        duration: Toast.durations.LONG,
                    });
                    return;
                }
    
                Toast.show(savePhotoResponse.message, {
                    duration: Toast.durations.LONG,
                });
            }
            navigation.navigate({
                name: 'History',
                params: {refresh: true}
            }
            );

        } catch (error) {
            Toast.show(error.message, {
                duration: Toast.durations.LONG,
            });
        } finally {
            setEnable(true);
        }
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
        <View style={{ flex: 1 }}>
        <ScrollView>
            <View style={[
                styles.container,
                theme==='dark'?
                    styles.containerDarkMode
                :
                    styles.containerLightMode
            ]}>
                <TextInput 
                    style={[ 
                        styles.snippetInput,
                        theme==='dark'?
                        (
                            styles.mainColorDark,
                            styles.snippetColorsDark
                        )
                        :
                        (
                            styles.mainColorLight,
                            styles.snippetColorsLight
                        )
                    ]}
                    value={snippetName}
                    placeholder={"Snippet Name..."}
                    onChangeText={val => setSnippetName(val)}
                />

                <View style={styles.contentWrapper}>
                    <RNPickerSelect
                        onValueChange={ changeLanguage }
                        items={ allowedProgrammingLanguages }
                        useNativeAndroidPickerStyle={false}
                        placeholder={languagePlaceHolder}
                        style={theme==='dark'?{
                            inputIOS: styles.inputIOSDark , 
                            inputAndroid: styles.inputAndroidDark, 
                            iconContainer:styles.iconContainer 
                        }:
                        {
                            inputIOS: styles.inputIOSLight , 
                            inputAndroid: styles.inputAndroidLight, 
                            iconContainer:styles.iconContainer 
                        }
                        }
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
                                onChange={(e) => {setCodeContent(e);
                                } }
                                initialValue={codeContent}
                                showLineNumbers
                                syntaxStyle={
                                    theme==="dark"?
                                        CodeEditorSyntaxStyles.atomOneDark
                                    :
                                        CodeEditorSyntaxStyles.github
                                }
                            />
                            
                        </View>
                        <Text style={[
                            styles.outputTitle,
                            theme==='dark'?
                                styles.mainColorDark
                            :
                                styles.mainColorLight
                            ]}>Output</Text>
                        <View style={[
                            styles.outputWrapper,
                            theme==='dark'?
                                styles.outputBorderDark
                            :
                                styles.outputBorderLight,
                                styles.outputWrapperLight
                            ]}>
                            <ScrollView nestedScrollEnabled>
                                <Text style={[
                                    styles.outputText,
                                    theme==='dark'?
                                    styles.mainColorDark
                                    :
                                    styles.mainColorLight
                                ]}>
                                    {output}
                                </Text>
                            </ScrollView>
                        </View>
                        <View 
                            style={styles.groupBtns}>
                            <FullWidthButton
                                groupBtn
                                BGBlue
                                enabled={enable? true : false}
                                title="Execute"
                                
                                onPress={showPrompt}
                                Icon={
                                    <FontAwesome5 name="play-circle" size={24} color={colors.white} />
                                }
                            />
                            <FullWidthButton
                                groupBtn
                                BGGreen
                                enabled={enable? true : false}
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
         
            <InputPrompt  
                setVisiblePrompt={setVisiblePrompt} 
                visiblePrompt={visiblePrompt}
                languageValue={chosenLanguage.value}
                textContent={codeContent}
                setOutput={setOutput}
            />
        </ScrollView>
        </View>

     );
 }

 export default RunCode;


