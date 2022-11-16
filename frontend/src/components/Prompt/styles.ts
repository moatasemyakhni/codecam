import { StyleSheet } from 'react-native';
import { colors } from '../../constants/palette';

export const styles = StyleSheet.create({
    
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
    btnAction:{ 
        padding:10, 
        backgroundColor: colors.white, 
        borderRadius: 5 
    },
});