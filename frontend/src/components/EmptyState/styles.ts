import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';

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
        fontSize: 20,
        textTransform: 'capitalize',
        marginTop: 30,
        color: colors.primary,
    }
});