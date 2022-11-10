import { StyleSheet } from 'react-native'
import { colors } from '../../constants/palette'


export const styles = StyleSheet.create({
    btnWrapper: {
        flex: 1, 
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        borderRadius: 5,
        height: 50,
    },
    btnText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    btnBGPrimary: {
        backgroundColor: colors.primary,
    },
    btnBGRed: {
        backgroundColor: colors.red,
    },
    btnBGGreen: {
        backgroundColor: colors.green,
    },
    btnBGBlue: {
        backgroundColor: colors.blue,
    },
    disabled: {
        opacity: 0.77,
    },
})

export default {
    styles,
}