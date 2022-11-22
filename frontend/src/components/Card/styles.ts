import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/palette';

export const styles = StyleSheet.create({
    cardContainerLight: {
        backgroundColor: colors.primary 
    },
    cardContainerDark: {
        backgroundColor: colors.white,
    },
    cardContainer: { 
        padding: spacing.l, 
        marginTop: spacing.xxl,
        marginHorizontal: spacing.xl,

    },
    snippetTitle: { 
        fontSize: fontSize.xxLarge,
        fontWeight: 'bold',

    },
    textLight: {
        color: colors.white 
    },
    textDark: {
        color: colors.lightBlack,
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
    },
    date: { 
        fontSize: fontSize.regular,
    },
    image: { 
        height: 300, 
        resizeMode:'contain',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    yellow: {
        color: colors.yellow
    },
    red: {
        color: colors.red,
    },
    white: {
        color: colors.white
    }
});