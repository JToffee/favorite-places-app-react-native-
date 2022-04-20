import { View, StyleSheet, Alert, Image, Text } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { colors } from "../../constants/colors";
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";
import { useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";
import { useEffect } from "react";

function LocationPicker({ onPickLocation }) {
	const [pickedLocation, setPickedLocation] = useState();
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const route = useRoute();

	//Store permision infor and request permission method
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();

	//Update state
	useEffect(() => {
		if (isFocused && route.params) {
			//Retrieve location from route parameters
			const mapPickedLocation = {
				lat: route.params.pickedLat,
				lng: route.params.pickedLng,
			};
			setPickedLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	// Update state in Place form when location changes
	useEffect(() => {
		//get human readable address
		async function handleLocation() {
			if (pickedLocation) {
				const address = await getAddress(
					pickedLocation.lat,
					pickedLocation.lng
				);
				onPickLocation({ ...pickedLocation, address: address });
			}
		}

		handleLocation();
	}, [pickedLocation, onPickLocation]);

	async function verifyPermissions() {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient permissions",
				"You need to grant location permissions to use this app"
			);
		}

		// Permissions are granted if the if blocks are passed
		return true;
	}

	//Get user location
	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) return;

		const location = await getCurrentPositionAsync(); //Can take an object to configure the fetch. eg interval
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}
	function pickOnMapHandler() {
		navigation.navigate("Map");
	}

	let locationPreview = <Text>No location picked yet</Text>;
	if (pickedLocation)
		locationPreview = (
			<Image
				style={styles.image}
				source={{
					uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
				}}
			/>
		);
	return (
		<View style={styles.container}>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.buttons}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on map
				</OutlinedButton>
			</View>
		</View>
	);
}

export default LocationPicker;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		flex: 1,
	},
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 15,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primary100,
		borderRadius: 4,
		overflow: "hidden",
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
