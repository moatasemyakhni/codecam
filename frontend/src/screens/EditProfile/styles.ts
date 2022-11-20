import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../../constants/palette';


export const styles = StyleSheet.create({
    containerDarkMode: {
        backgroundColor: colors.darkMode.background,
    },
    containerLightMode: {
        backgroundColor: colors.lightMode.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: spacing.paddingFromPhoneWidth,
        minHeight: Math.round(Dimensions.get('window').height)
    },
    imageWrapper: { 
        backgroundColor: 'black', 
        width:200, 
        alignSelf: 'center', 
        justifyContent: 'center', 
        height: 200, 
        marginVertical: 40, 
        borderRadius: 9999, 
        position: 'relative'  
    },
    imageText: { 
        color: 'white', 
        fontSize: 28, 
        position:'absolute', 
        left: 80,
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
        marginTop: 40,
    },
    btnWrapper:{  

    },
});