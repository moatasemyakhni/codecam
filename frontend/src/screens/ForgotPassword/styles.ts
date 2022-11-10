import { StyleSheet } from 'react-native'
import { colors, spacing } from '../../constants/palette'

export const styles = StyleSheet.create({
    forgotPasswordContainer: { backgroundColor: colors.darkMode.background },
    logoWrapper: {flex:1, alignItems: 'center'},
    linkTopPadding: {
        paddingTop: spacing.paddingTop10,
    },
    form: {
        paddingHorizontal: spacing.paddingFromPhoneWidth,
    },
    statusMessage: {
        fontSize: 20,
        lineHeight: 23,
        textAlign: 'center',
        marginVertical: 10,
        paddingVertical: 21,
    },
    error: { 
        color: colors.darkMode.red,
        backgroundColor: colors.darkMode.redOpacity,
    },
    success: {
        color: colors.darkMode.green,
        backgroundColor: colors.darkMode.greenOpacity
    }
});

export default {
    styles,
}