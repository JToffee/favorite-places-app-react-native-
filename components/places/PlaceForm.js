import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { useCallback } from "react";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
	//State for inputs
	const [enteredTitle, setEnteredTitle] = useState("");
	const [pickedLocation, setPickedLocation] = useState();
	const [selectedImage, setSelectedImage] = useState();

	function changeTitleHandler(enteredTitle) {
		setEnteredTitle(enteredTitle);
	}

	function takeImageHandler(imageUri) {
		setSelectedImage(imageUri);
	}

	const pickLocationHandler = useCallback(
		(location) => setPickedLocation(location),
		[]
	);

	function savePlaceHandler() {
		const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
		onCreatePlace(placeData);
	}

	// JSX to allow user to enter a place
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.form}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						onChangeText={changeTitleHandler}
						value={enteredTitle}
					/>
				</View>
				<ImagePicker onTakeImage={takeImageHandler} />
				<LocationPicker onPickLocation={pickLocationHandler} />
				<Button onPress={savePlaceHandler}>Add Place</Button>
			</View>
		</ScrollView>
	);
}

export default PlaceForm;
const styles = StyleSheet.create({
	container: {
		paddingBottom: 40,
	},
	form: {
		flex: 1,
		padding: 24,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 4,
		color: colors.primary500,
	},
	input: {
		marginVertical: 8,
		paddingHorizontal: 10,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomWidth: 2,
		borderBottomColor: colors.primary700,
		backgroundColor: colors.primary100,
	},
});
