import { Keyboard, StyleSheet } from "react-native";
import { colors } from "../../constants/palette";


export const styles = StyleSheet.create({
    containerLightMode: {
        backgroundColor: colors.lightMode.background,
    },
    containerDarkMode: {
        backgroundColor: colors.darkMode.background,
    },
    container : {
       flex: 1,
    },
    snippetColorsDark: {
        backgroundColor: colors.white,
        color: colors.lightBlack,
    },
    snippetColorsLight: {
        backgroundColor: colors.darkMode.background,
        color: colors.white,
    },
    snippetInput: {
       height: 50,
       paddingHorizontal: 10,
       paddingTop: 20,
       paddingBottom: 15,
       fontWeight: 'bold',
       marginBottom: 15,
    },
    iconContainer: {
       paddingTop: 25,
       paddingRight: 20,
    },
    contentWrapper: {
       paddingHorizontal: 22,
    },
    selectInputColorsDark: {

    },
    selectInputColorsLight: {
    },
    inputIOSDark: {
       fontSize: 15,
       paddingTop: 20,
       paddingHorizontal: 15,
       paddingBottom: 15,
       borderWidth: 2,
       borderColor: colors.lightBlack,
       borderRadius: 5,
       color: colors.white,
       backgroundColor: colors.lightBlackOpacity,
   },
   inputAndroidDark: {
       fontSize: 15,
        paddingTop: 20,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderWidth: 2,
        borderColor: colors.lightBlack,
        borderRadius: 5,
        color: colors.white,
        backgroundColor: colors.lightBlackOpacity,
   },
   inputIOSLight: {
    fontSize: 15,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderWidth: 2,
    borderColor: colors.lightBlack,
    borderRadius: 5,
    color: colors.white,
    backgroundColor: colors.gray
    },
    inputAndroidLight: {
        fontSize: 15,
        paddingTop: 20,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderWidth: 2,
        borderColor: colors.lightBlack,
        borderRadius: 5,
        color: colors.white,
        backgroundColor: colors.gray
    },
   editorContainer: { 
    borderWidth: 2, 
    borderColor: colors.primary, 
    borderRadius: 5, 
    height: 300, 
    marginVertical: 15 
    },
    
    mainColorLight: {
        color: colors.primary
    },
    mainColorDark: {
        color: colors.white
    },
    outputTitle: { 
        textAlign:'center', 
        fontWeight: 'bold', 
        fontSize: 15,
        paddingBottom: 16, 
    },
    outputBorderDark: {
        borderColor: colors.white 
    },
    outputBorderLight: {
        borderColor: colors.primary 
    },
    outputWrapper:{ 
        height: 150, 
        borderTopWidth:1, 
    },
    outputWrapperLight: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    outputText: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    groupBtns: { 
        flexDirection:'row', 
        justifyContent: 'space-between', 
        marginVertical: 21
    },
    promptContainer: { 
        backgroundColor: colors.primary,  
    },
    promptTitle: { 
        color: colors.white, 
        fontSize: 20, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        textTransform: 'capitalize' 
    },
    promptDescription: {
        color: colors.white, 
        fontSize: 16,
    },
    descriptionTitle: {
        padding: 5,
    },
    codeSnippet: { 
        backgroundColor: colors.darkMode.background, 
        padding: 10,
        borderRadius: 5, 
    },
    yellow: {
        color: colors.yellow
    },
    red: {
        color: colors.red,
    },
    white: {
        color: colors.white
    }

});


