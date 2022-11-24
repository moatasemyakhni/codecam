import { StyleSheet, Dimensions } from "react-native";


export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 9999
    },
    containerPositionForSm: {
        top: Math.floor(Dimensions.get('window').height/2) - 60,
        left: Math.floor(Dimensions.get('window').width/2) - 60,
    },
    containerPositionForLg: {
        top: Math.floor(Dimensions.get('window').height/2) - 150,
        left: Math.floor(Dimensions.get('window').width/2) - 150,
    },
    titleText: {
        fontWeight: 'bold',
    }
});