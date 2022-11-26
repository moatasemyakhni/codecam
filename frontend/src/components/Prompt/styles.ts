import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/palette';

export const styles = StyleSheet.create({
    
    promptTitle: { 
        color: colors.white, 
        fontSize: fontSize.xLarge, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        textTransform: 'capitalize' 
    },
    promptDescription: {
        color: colors.white, 
        fontSize: fontSize.regular,
    },
    btnCancel: { 
        borderWidth:1, 
        borderColor: colors.white, 
        borderRadius: spacing.sm, 
        marginRight: spacing.md, 
    },
    btnAction:{ 
        padding: spacing.md, 
        backgroundColor: colors.white, 
        borderRadius: spacing.sm, 
    },
});