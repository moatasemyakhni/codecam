import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/palette';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        paddingBottom: spacing.xl,
    },
    camera: {   
        flex: 1,
        borderRadius: spacing.xl,
        resizeMode: 'contain',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.xxxl,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.xxxl,
    },
    permissionDeniedContainer: {
        backgroundColor: colors.darkMode.background,
        alignItems: 'center', 
        height: Dimensions.get('window').height, 
        width: Dimensions.get('window').width

    },
    deniedPermissionText: {
        fontSize: fontSize.xLarge,
        color: colors.red,
        backgroundColor: colors.redOpacity,
        fontWeight: 'bold',
        padding: spacing.sm,
    },
    bottomContainerContentWrapper: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    bottomContainerButtonsWrapper: { 
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    icon: { 
        alignItems: 'center'
    },
    iconLabelText: {
        color: colors.white,

    },
    flashOn: {
        color: colors.primary,
    },
    flashOff: {
        color: colors.white,
    }
    
    
});