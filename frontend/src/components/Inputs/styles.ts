import { StyleSheet } from 'react-native'
import { colors, fontSize, spacing } from '../../constants/palette'


export const styles = StyleSheet.create({
    inputTextColorLight: {
        color: colors.lightBlack
    },
    inputTextColorDark: {
        color: colors.white
    },
    input: {
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderRadius: spacing.sm,
        padding: spacing.md,
        color: colors.white,
        fontSize: fontSize.xLarge,
    },
    inputError: {  
        borderColor: colors.red,
    },
    inputErrorFree: {  
        borderColor: colors.primary,
    },
    label: {
        textTransform: 'capitalize',
        paddingBottom: 2,
        fontSize: fontSize.medium,
    },
    labelText: {
        color: colors.primary,

    },
    errorMessage: {
        color: colors.red,
    },
    inputGap: {
        marginVertical: spacing.xxl,
    }
})

export default {
    styles,
}