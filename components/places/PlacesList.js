import { FlatList, View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
	const navigation = useNavigation();

	function selectPlaceHandler(id) {
		navigation.navigate("PlaceDetails", { placeId: id });
	}

	//JSX to render a single place -  flatlist passes itemData which has an item property
	function renderPlace({ item }) {
		return <PlaceItem place={item} onSelect={selectPlaceHandler} />;
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
			style={styles.list}
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={renderPlace}
		/>
	);
}

export default PlacesList;

const styles = StyleSheet.create({
	list: {
		margin: 24,
	},
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 18,
		color: colors.primary200,
	},
});
