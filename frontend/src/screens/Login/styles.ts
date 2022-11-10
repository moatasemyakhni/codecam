import { StyleSheet } from 'react-native'
import { colors, spacing } from '../../constants/palette'

export const styles = StyleSheet.create({
    loginContainer: { flex: 1, backgroundColor: colors.darkMode.background },
    logoWrapper: {flex:1, alignItems: 'center'},
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