import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/palette';


export const styles = StyleSheet.create({
    containerDarkMode: {
        backgroundColor: colors.darkMode.background,
    },
    containerLightMode: {
        backgroundColor: colors.lightMode.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: spacing.spaceFromPhoneEdge,
        minHeight: Math.round(Dimensions.get('window').height)
    },
    imageWrapper: { 
        backgroundColor: 'black', 
        width:200, 
        alignSelf: 'center', 
        justifyContent: 'center', 
        height: 200, 
        marginVertical: spacing.x4l, 
        borderRadius: 9999, 
        position: 'relative'  
    },
    imageText: { 
        color: 'white', 
        fontSize: fontSize.xxxLarge, 
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
        marginVertical: spacing.x4l,
        opacity:0.3,
    },
    btnContainer: {
        flex: 1,  
        marginTop: spacing.x4l,
    },
});