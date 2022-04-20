import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/ui/IconButton";
import { colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";
import PlaceDetails from "./screens/PlaceDetails";

// create stack

const Stack = createNativeStackNavigator();

// options in all places screen -  takes in a function  that returns the set options. Function so as to access the navigation prop
export default function App() {
	const [dbInitalized, setDbInitialized] = useState(false);

	//initialize database
	useEffect(() => {
		init()
			.then(() => {
				setDbInitialized(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (!dbInitalized) return <AppLoading />;
	return (
		<>
			<StatusBar style="dark" />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: colors.primary500 },
						headerTintColor: colors.grey,
						contentStyle: { backgroundColor: colors.grey },
					}}
				>
					<Stack.Screen
						name="AllPlaces"
						component={AllPlaces}
						options={({ navigation }) => ({
							title: "My favorite places",
							headerRight: ({ tintColor }) => (
								<IconButton
									icon="add"
									size={24}
									color={tintColor}
									onPress={() => navigation.navigate("AddPlace")}
								/>
							),
						})}
					/>
					<Stack.Screen
						name="AddPlace"
						component={AddPlace}
						options={{
							title: "Add a new place",
						}}
					/>
					<Stack.Screen name="Map" component={Map} />
					<Stack.Screen
						name="PlaceDetails"
						component={PlaceDetails}
						options={{ title: "loading place..." }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
