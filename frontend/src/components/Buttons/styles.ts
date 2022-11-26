import { StyleSheet } from 'react-native'
import { colors, fontSize, spacing } from '../../constants/palette'


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
        borderRadius: spacing.sm,
        height: 50,
    },
    btnText: {
        color: colors.white,
        fontSize: fontSize.large,
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
        opacity: 0.5,
    },
    iconBtn: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: spacing.xl,
    },
    iconText: {
        fontWeight: 'bold',
        fontSize: fontSize.regular,
        color: colors.white,
        marginLeft: spacing.md,
    },
    bgIconBtn: { 
        backgroundColor: 'transparent', 
        justifyContent: 'flex-start',
        paddingVertical: spacing.l,
        paddingHorizontal: spacing.md,
        height: 63,
        borderBottomWidth: 1,
        borderColor: colors.white,
      },
    bgIconText: {
        fontSize: fontSize.xLarge, 
        textTransform: 'uppercase'
    },
    textLightMode: {
        color: colors.primary,
    },
    textDarkMode: {
        color: colors.white
    },
    borderTextLightMode: {
        
        borderColor: colors.primary
    },
    borderTextDarkMode: {
        borderColor: colors.white
    },
});