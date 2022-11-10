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
        color: colors.red,
        backgroundColor: colors.redOpacity,
    },
    success: {
        color: colors.green,
        backgroundColor: colors.greenOpacity
    }
});

export default {
    styles,
}