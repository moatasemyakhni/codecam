import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants/palette';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    camera: {   
        flex: 1,
        borderRadius: 20,
        resizeMode: 'contain',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
    },
    permissionDeniedContainer: {
        backgroundColor: colors.darkMode.background,
        alignItems: 'center', 
        height: Dimensions.get('window').height, 
        width: Dimensions.get('window').width

    },
    deniedPermissionText: {
        fontSize: 20,
        color: colors.red,
        backgroundColor: colors.redOpacity,
        fontWeight: 'bold',
        padding: 5,
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

export default {
    styles,
}