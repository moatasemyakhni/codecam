import { StyleSheet } from 'react-native'
import { colors, fontSize, spacing } from '../../constants/palette'

export const styles = StyleSheet.create({
    containerBgColorLight: {
        backgroundColor: colors.lightMode.background 
    },
    containerBgColorDark: {
        backgroundColor: colors.darkMode.background,
    },
    forgotPasswordContainer: { 
        flex: 1,
    },
    logoWrapper: {
        flex:1, 
        alignItems: 'center'
    },
    linkTopPadding: {
        paddingTop: spacing.md,
    },
    form: {
        paddingHorizontal: spacing.spaceFromPhoneEdge,
    },
    statusMessage: {
        fontSize: fontSize.xLarge,
        lineHeight: 23,
        textAlign: 'center',
        marginVertical: spacing.md,
        paddingVertical: spacing.xl,
    },
    error: { 
        color: colors.red,
        backgroundColor: colors.redOpacity,
    },
    success: {
        color: colors.green,
        backgroundColor: colors.greenOpacity
    }
});

export default {
    styles,
}