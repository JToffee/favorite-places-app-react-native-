import { Ionicons } from "@expo/vector-icons";

import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
function OutlinedButton({ icon, children, onPress }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.presssed]}
			onPress={onPress}
		>
			<Ionicons
				style={styles.icon}
				name={icon}
				size={18}
				color={colors.primary500}
			/>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
}

export default OutlinedButton;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderWidth: 1,
		borderColor: colors.primary500,
	},
	presssed: {
		opacity: 0.7,
	},
	icon: {
		marginRight: 6,
	},
	text: {
		color: colors.primary500,
	},
});
