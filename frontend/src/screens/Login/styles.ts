import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/palette';


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
        paddingTop: spacing.md,
    },
    form: {
        paddingHorizontal: spacing.spaceFromPhoneEdge,
    },
    links: {
        fontSize: fontSize.xLarge,
        lineHeight: 23,
        color: colors.primary,
        textAlign: 'center',
        paddingBottom: spacing.xxl,
    }
});

export default {
    styles,
}