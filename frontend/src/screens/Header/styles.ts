import { StyleSheet } from 'react-native'
import { colors, fontSize, spacing } from '../../constants/palette';

export const styles = StyleSheet.create({
    container: { 
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    title: { 
        flex: 1, 
        textAlign: 'center', 
        fontSize: fontSize.xxLarge, 
        fontWeight:'bold', 
        color: colors.white,
    },
    
    image: { 
        backgroundColor: colors.white,
        width: 36,
        height: 36,
        borderRadius: spacing.xl,
        resizeMode: 'contain', 
    },
    smSize: {
        width: 36,
        height: 36,
    }
});