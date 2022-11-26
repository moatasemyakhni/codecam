import {StyleSheet} from 'react-native';
import { colors } from '../../constants/palette';



export const styles = StyleSheet.create({
  containerBgColorLight: {
    backgroundColor: colors.lightMode.background 
  },
  containerBgColorDark: {
    backgroundColor: colors.darkMode.background,
  },
  container: { 
      flex: 1,
    },
});