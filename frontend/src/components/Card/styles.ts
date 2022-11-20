import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';

export const styles = StyleSheet.create({
    cardContainerLight: {
        backgroundColor: colors.primary 
    },
    cardContainerDark: {
        backgroundColor: colors.white,
    },
    cardContainer: { 
        padding: 15, 
        marginTop: 25,
        marginHorizontal: 22,

    },
    snippetTitle: { 
        fontSize: 22,
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
        marginBottom: 20,
    },
    date: { 
        fontSize: 16,

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