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
    // iconButton
    iconBtn: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    iconText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.white,
        marginLeft: 10,
    }
})

export default {
    styles,
}