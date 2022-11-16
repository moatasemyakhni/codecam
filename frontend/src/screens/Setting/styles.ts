import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants/palette';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkMode.background,
        paddingHorizontal: spacing.paddingFromPhoneWidth,

    },
    image: {
        width: '60%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 40,
    },
    name: {
        textAlign: 'center',
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 200,

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