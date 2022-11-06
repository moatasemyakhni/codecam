import { StyleSheet } from 'react-native'
import { colors } from '../../constants/palette'


export const styles = StyleSheet.create({
    input: {
        height: 54,
        backgroundColor: colors.darkMode.transparent,
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        color: colors.darkMode.white,
        fontSize: 20,
    },
    inputError: {  
        borderColor: colors.darkMode.red,
    },
    inputErrorFree: {  
        borderColor: colors.darkMode.primary,
    },
    label: {
        textTransform: 'capitalize',
        paddingBottom: 2,
        fontSize: 14,
    },
    labelText: {
        color: colors.darkMode.primary,

    },
    errorMessage: {
        color: colors.darkMode.red,
    }
})

export default {
    styles,
}