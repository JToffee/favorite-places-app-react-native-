import { Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../../constants/colors";

function Button({ onPress, children }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
			android_ripple={{ colors: colors.primary500 }}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 10,
		backgroundColor: colors.primary700,
		elevation: 2,
		shadowColor: "black",
		shadowOpacity: 0.15,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 2,
		borderRadius: 4,
	},
	pressed: {
		opacity: 0.7,
	},
	text: {
		textAlign: "center",
		fontSize: 16,
		color: colors.primary50,
	},
});
