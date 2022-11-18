import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../../constants/palette';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkMode.background,
        paddingHorizontal: spacing.paddingFromPhoneWidth,
        minHeight: Math.round(Dimensions.get('window').height) - 60
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        backgroundColor: '#f5f5f5', 
        height: 200, 
        borderRadius: 999,
        width: 200,
        marginVertical: 40,
        opacity:0.3,
    },
    btnContainer: {
        flex: 1, 
        width: '100%', 
        position: 'relative' 
    },
    btnWrapper:{ 
        position:'absolute', 
        bottom: 30, 
        width:'100%' 
    },
});