const GOOGLE_API_KEY = "";

//Function to construct map url

export function getMapPreview(lat, lng) {
	// `change centre- latitude, longitude,, size , markers -  one, red,  after C injct lat, lng, api key`;

	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&  markers=color:red%7Clabel:C%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

	return imagePreviewUrl;
}
// Reverse geocoding

export async function getAddress(lat, lng) {
	// google reverse geocoding api url
	try {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Failed to fetch address");
		}

		const data = await response.json();

		const address = data.results[0].formatted_address;
		return address;
	} catch (err) {
		console.log(err.message);
	}
}
