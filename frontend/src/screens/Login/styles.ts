import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants/palette';


export const styles = StyleSheet.create({
    containerBgColorLight: {
        backgroundColor: colors.lightMode.background 
    },
    containerBgColorDark: {
        backgroundColor: colors.darkMode.background,
    },
    loginContainer: { 
        flex: 1,
    },
    logoWrapper: {
        flex:1, 
        alignItems: 'center'
    },
    linkTopPadding: {
        paddingTop: spacing.paddingTop10,
    },
    form: {
        paddingHorizontal: spacing.paddingFromPhoneWidth,
    },
    links: {
        fontSize: 20,
        lineHeight: 23,
        color: colors.primary,
        textAlign: 'center',
        paddingBottom: 21,
    }
});

export default {
    styles,
}