import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useState, useCallback, useLayoutEffect } from "react";
import { Alert } from "react-native";
import IconButton from "../components/ui/IconButton";

function Map({ navigation, route }) {
	const initialLocation = route.params && {
		lat: route.params.initialLat,
		lng: route.params.initialLng,
	};

	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	const region = {
		latitude: initialLocation.lat ?? 37.78,
		longitude: initialLocation.lng ?? -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	function selectLocationHandler(e) {
		if (initialLocation) return;
		//Get coordinates of where the press event occured

		const lat = e.nativeEvent.coordinate.latitude;
		const lng = e.nativeEvent.coordinate.longitude;

		// update state
		setSelectedLocation({ lat: lat, lng: lng });
	}

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert("No location picked", "Tap on the map to pick a location ");
			return;
		}
		navigation.navigate("AddPlace", {
			pickedLat: selectedLocation.lat,
			pickedLng: selectedLocation.lng,
		});
	}, [navigation, selectedLocation]);

	useLayoutEffect(() => {
		if (initialLocation) return;

		return navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					icon="save"
					size={24}
					color={tintColor}
					onPress={savePickedLocationHandler}
				/>
			),
		});
	}, [navigation, savePickedLocationHandler, initialLocation]);

	return (
		<MapView
			style={styles.map}
			initialRegion={region}
			onPress={selectLocationHandler}
		>
			{selectedLocation && (
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.lng,
					}}
				/>
			)}
		</MapView>
	);
}

export default Map;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
