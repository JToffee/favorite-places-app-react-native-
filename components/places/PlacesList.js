import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceITem from "./PlaceITem";

function PlacesList({ places }) {
	//JSX to render a single place -  flatlist passes itemData which has an item property
	function renderPlace({ item }) {
		<PlaceITem place={item} />;
	}

	//Fallback text for when there are no places to show

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}> No places yet. Start adding</Text>
			</View>
		);
	}
	//flatlist because the list  could be very long. Flatlist provides performance & scrollable list

	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={renderPlace}
		/>
	);
}

export default PlacesList;

const styles = StyleSheet.create({
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 18,
	},
});
