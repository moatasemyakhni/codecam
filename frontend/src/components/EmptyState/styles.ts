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
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: fontSize.xLarge,
        textTransform: 'capitalize',
        marginTop: spacing.xxxl,
        color: colors.primary,
    }
});