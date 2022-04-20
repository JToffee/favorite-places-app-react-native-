import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
	async function createPlacehandler(place) {
		await insertPlace(place);
		navigation.navigate("AllPlaces");
	}

	return <PlaceForm onCreatePlace={createPlacehandler} />;
}

export default AddPlace;
