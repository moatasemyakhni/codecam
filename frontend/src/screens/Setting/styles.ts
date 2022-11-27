import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/palette';

export const styles = StyleSheet.create({
    containerLightMode: {
        backgroundColor: colors.lightMode.background,
    },
    containerDarkMode: {
        backgroundColor: colors.darkMode.background,
    },
    container: {
        flex: 1,
        backgroundColor: colors.darkMode.background,
        paddingHorizontal: spacing.spaceFromPhoneEdge,

    },
    themeIcon: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        marginTop: spacing.md,
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        backgroundColor: '#f5f5f5', 
        height: 200, 
        borderRadius: 999,
        width: 200,
        marginBottom: spacing.x4l,
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
    name: {
        textAlign: 'center',
        color: colors.white,
        fontWeight: 'bold',
        fontSize: fontSize.xxLarge,
        marginBottom: 2*spacing.x4l,

    },
    btnContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.white,
    },
    btn: {
        width: '100%',
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
    },
    btnGrouping:{ 
        borderTopWidth: 1, 
        borderColor: colors.white, 
        marginBottom: spacing.xxxl 
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
});