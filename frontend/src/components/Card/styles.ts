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
    },
    date: { 
        fontSize: 16,

    },
    image: { 
        height: 300, 
        resizeMode:'contain'
    },
    promptContainer: { 
        backgroundColor: colors.red,  
    },
    promptTitle: { 
        color: colors.white, 
        fontSize: 20, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        textTransform: 'capitalize' 
    },
    promptDescription: {
        color: colors.white, 
        fontSize: 16,
    },
    btnCancel: { 
        borderWidth:1, 
        borderColor: colors.white, 
        borderRadius: 5, 
        marginRight: 10 
    },
    btnDelete:{ 
        padding:10, 
        backgroundColor: colors.white, 
        borderRadius: 5 
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