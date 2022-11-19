import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';

export const styles = StyleSheet.create({
    cardContainer: { 
        padding: 15, 
        marginTop: 25,
        marginHorizontal: 22,
        backgroundColor: colors.white,

    },
    snippetTitle: { 
        fontSize: 22,
        fontWeight: 'bold',

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
        resizeMode:'contain'
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