import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkMode.background,
    },
    text: {
        fontSize: 20,
        textTransform: 'capitalize',
        marginTop: 30,
        color: colors.primary,
    }
});