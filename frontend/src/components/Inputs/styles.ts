import { StyleSheet } from 'react-native'
import { colors, spacing } from '../../constants/palette'


export const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        color: colors.white,
        fontSize: 20,
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
        fontSize: 14,
    },
    labelText: {
        color: colors.primary,

    },
    errorMessage: {
        color: colors.red,
    },
    inputGap: {
        marginVertical: spacing.gapBetweenInputs,
    }
})

export default {
    styles,
}