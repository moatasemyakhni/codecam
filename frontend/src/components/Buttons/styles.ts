import { StyleSheet } from 'react-native'
import { colors } from '../../constants/palette'


export const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%'
    },
    btnWrapper: {
        flex: 1, 
    },
    groupBtn: {
        width: '45%'
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
    },
    bgIconBtn: { 
        backgroundColor: 'transparent', 
        justifyContent: 'flex-start',
        paddingVertical: 14,
        paddingHorizontal: 8,
        height: 63,
        borderBottomWidth: 1,
        borderColor: 'white',
      },
      bgIconText: {
        fontSize: 20, 
        textTransform: 'uppercase'
    },

});