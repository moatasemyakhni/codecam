import { StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "../../constants/palette";


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
       paddingHorizontal: spacing.md,
       paddingTop: spacing.xl,
       paddingBottom: spacing.l,
       fontWeight: 'bold',
       marginBottom: spacing.l,
    },
    iconContainer: {
       paddingTop: spacing.xxl,
       paddingRight: spacing.xl,
    },
    contentWrapper: {
       paddingHorizontal: spacing.xl,
    },
    inputIOSDark: {
       fontSize: fontSize.regular,
       paddingTop: spacing.xl,
       paddingHorizontal: spacing.l,
       paddingBottom: spacing.l,
       borderWidth: 2,
       borderColor: colors.lightBlack,
       borderRadius: spacing.sm,
       color: colors.white,
       backgroundColor: colors.lightBlackOpacity,
   },
   inputAndroidDark: {
       fontSize: fontSize.regular,
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.l,
        paddingBottom: spacing.l,
        borderWidth: 2,
        borderColor: colors.lightBlack,
        borderRadius: spacing.sm,
        color: colors.white,
        backgroundColor: colors.lightBlackOpacity,
   },
   inputIOSLight: {
    fontSize: fontSize.regular,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.l,
    borderWidth: 2,
    borderColor: colors.lightBlack,
    borderRadius: spacing.sm,
    color: colors.white,
    backgroundColor: colors.gray
    },
    inputAndroidLight: {
        fontSize: fontSize.regular,
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.l,
        paddingBottom: spacing.l,
        borderWidth: 2,
        borderColor: colors.lightBlack,
        borderRadius: spacing.sm,
        color: colors.white,
        backgroundColor: colors.gray
    },
   editorContainer: { 
    borderWidth: 2, 
    borderColor: colors.primary, 
    borderRadius: spacing.sm, 
    height: 300, 
    marginVertical: spacing.l, 
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
        fontSize: fontSize.regular,
        paddingBottom: spacing.l, 
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
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
    },
    groupBtns: { 
        flexDirection:'row', 
        justifyContent: 'space-between', 
        marginVertical: spacing.xl,
    },
    promptContainer: { 
        backgroundColor: colors.primary,  
    },
    promptTitle: { 
        color: colors.white, 
        fontSize: fontSize.xLarge, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        textTransform: 'capitalize' 
    },
    promptDescription: {
        color: colors.white, 
        fontSize: fontSize.regular,
    },
    descriptionTitle: {
        padding: spacing.sm,
    },
    codeSnippet: { 
        backgroundColor: colors.darkMode.background, 
        padding: spacing.md,
        borderRadius: spacing.sm, 
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


