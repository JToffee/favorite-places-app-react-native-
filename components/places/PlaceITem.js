import { Image, View, Text, Pressable, StyleSheet } from "react-native";

// Rendering each place item dynamically. Each place is made pressable to view more details

function PlaceITem({ place, onSelect }) {
	return (
		<Pressable onPress={onSelect}>
			<Image source={{ uri: place.imageUri }} />
			<View>
				<Text>{place.title}</Text>
				<Text>{place.address}</Text>
			</View>
		</Pressable>
	);
}

export default PlaceITem;

const styles = StyleSheet.create();
