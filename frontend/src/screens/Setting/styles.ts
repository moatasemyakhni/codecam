import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants/palette';

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
        paddingHorizontal: spacing.paddingFromPhoneWidth,

    },
    themeIcon: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        backgroundColor: '#f5f5f5', 
        height: 200, 
        borderRadius: 999,
        width: 200,
        marginBottom: 40,
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
        fontSize: 22,
        marginBottom: 100,

    },
    btnContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.white,
    },
    btn: {
        width: '100%',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
    },
    btnGrouping:{ 
        borderTopWidth: 1, 
        borderColor: 'white', 
        marginBottom: 30 
    },
});