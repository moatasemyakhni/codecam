import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/palette";


export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Math.floor(Dimensions.get('window').height/4),
        left: Math.floor(Dimensions.get('window').width/4),
        backgroundColor: colors.lightBlackOpacity,
        zIndex: 9999
    },
    image: { 
        width: 150, 
        height: 150 
    }
});