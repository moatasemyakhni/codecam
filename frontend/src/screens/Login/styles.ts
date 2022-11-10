import { StyleSheet } from 'react-native'
import { colors, spacing } from '../../constants/palette'

export const styles = StyleSheet.create({
    loginContainer: { backgroundColor: colors.darkMode.background },
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
        color: colors.darkMode.primary,
        textAlign: 'center',
        paddingBottom: 21,
    }
});
// export const styles = StyleSheet.create({
//     logoWrapper: {
//         flexDirection: 'row', 
//         justifyContent: 'center',
//         paddingTop: 96,
//         paddingBottom: 105,
//     },
//     form: {
//         paddingHorizontal: 20,
//         paddingVertical: 30,

//     },
//     gap: {
//         paddingVertical: 26,
//     },
//     links: {
//         fontSize: 20,
//         lineHeight: 23,
//         color: colors.darkMode.primary,
//         textAlign: 'center',
//         paddingBottom: 21,
//     }
// });

export default {
    styles,
}