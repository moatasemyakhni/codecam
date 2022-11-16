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