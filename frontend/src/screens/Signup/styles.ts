import { StyleSheet } from "react-native";
import { colors, spacing } from "../../constants/palette";

export const styles = StyleSheet.create({
    containerBgColorLight: {
        backgroundColor: colors.lightMode.background 
    },
    containerBgColorDark: {
        backgroundColor: colors.darkMode.background,
    },
    signupContainer: { 
        flex:1,  
        backgroundColor: colors.darkMode.background, 
        paddingTop: spacing.xxl 
    },
    form: { 
        paddingHorizontal: spacing.spaceFromPhoneEdge, 
        flex: 1
    },
})

export default {
    styles
}