import { View, Button, Alert, Text, Image, StyleSheet } from "react-native";
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

function ImagePicker({ onTakeImage }) {
	// State to store taken image

	const [imagePicked, setImagePicked] = useState();

	// ***************IOS*******************

	//Hook used to request permissions on IOS
	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions();

	async function verifyPermissions() {
		// PermissionStatus enum contains built in statuses
		//check if we dont know if we have perission.
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			// get permission
			const permissionResponse = await requestPermission();
			// returns true if user grants permission. else the promise is rejected
			return permissionResponse.granted;
		}
		//check is user denied permission
		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient permissions",
				"You need to grant camera permissions to use this app"
			);
		}

		// Permissions are granted if the if blocks are passed
		return true;
	}

	//Take photo handler
	async function takeImageHandler() {
		//Check IOS permissions
		const hasPermission = await verifyPermissions();
		if (!hasPermission) return;

		// launch camera and configure options
		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		//store image uri in state
		setImagePicked(image.uri);
		onTakeImage(image.uri);
	}
	let imagePreview = <Text>No image taken</Text>;

	if (imagePicked) {
		imagePreview = <Image style={styles.image} source={{ uri: imagePicked }} />;
	}
	return (
		<View style={styles.container}>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon="camera" onPress={takeImageHandler}>
				Take Image
			</OutlinedButton>
		</View>
	);
}

export default ImagePicker;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
	},
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primary100,
		borderRadius: 4,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
