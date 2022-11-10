import { StyleSheet } from "react-native";
import { colors, spacing } from "../../constants/palette";

export const styles = StyleSheet.create({
    signupContainer: { flex:1,  backgroundColor: colors.darkMode.background, paddingTop: 27 },
    form: { paddingHorizontal: spacing.paddingFromPhoneWidth, flex: 1}
})

export default {
    styles
}