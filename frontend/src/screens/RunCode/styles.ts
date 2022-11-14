import { Keyboard, StyleSheet } from "react-native";
import { colors } from "../../constants/palette";


export const styles = StyleSheet.create({
    container : {
       flex: 1,
       backgroundColor: colors.darkMode.background,

    },
    snippetInput: {
       height: 50,
       paddingHorizontal: 5,
       paddingTop: 20,
       paddingBottom: 15,
       backgroundColor: colors.white,
       color: colors.lightBlack,
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
    inputIOS: {
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
   inputAndroid: {
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
   editorContainer: { 
    borderWidth: 2, 
    borderColor: colors.primary, 
    borderRadius: 5, 
    height: 300, 
    marginVertical: 15 
    },
    outputTitle: { 
        textAlign:'center', 
        fontWeight: 'bold', 
        fontSize: 15, 
        color: colors.white, 
        paddingBottom: 16, 
    },
    outputWrapper:{ 
        height: 150, 
        borderTopWidth:1, 
        borderTopColor: colors.white 
    },
    groupBtns: { 
        flexDirection:'row', 
        justifyContent: 'space-between', 
        marginVertical: 21
    },

});


