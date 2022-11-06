import { StyleSheet } from 'react-native'
import { colors } from '../../constants/palette'


export const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkMode.primary,
        borderRadius: 5,
        height: 50,
    },
    btnText: {
        color: colors.darkMode.white,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    btnBGPrimary: {
        backgroundColor: colors.darkMode.primary,
    },
    btnBGRed: {
        backgroundColor: colors.darkMode.red,
    },
    btnBGGreen: {
        backgroundColor: colors.darkMode.green,
    },
    btnBGBlue: {
        backgroundColor: colors.darkMode.blue,
    },
    disabled: {
        opacity: 0.77,
    },
})

export default {
    styles,
}