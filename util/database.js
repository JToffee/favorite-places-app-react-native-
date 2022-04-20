import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

//create database
const database = SQLite.openDatabase("places.db");

//set up inital db structure

export function init() {
	//promisify this function

	const promise = new Promise((resolve, reject) => {
		//Set up table
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS places (
				id INTEGER PRIMARY KEY NOT NULL,
				title TEXT NOT NULL,
				imageUri TEXT NOT NULL,
				address TEXT NOT NULL,
				lat REAL NOT NULL,
				lng REAL NOT NULL
        ) `,
				[], //data
				() => resolve(), // success callBack function
				(transaction, error) => reject(error) // error callback function
			);
		});
	});

	return promise;
}

//Add place data to places table
export function insertPlace(place) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO places(
                title, imageUri, address, lat, lng)
                VALUES (?,?,?,?,?)`, //placeholders
				[
					place.title,
					place.imageUri,
					place.address,
					place.location.lat,
					place.location.lng,
				], //concrete values
				(transaction, result) => {},
				(_, error) => reject(error)
			);
		});
	});

	return promise;
}

//fetch all places from sqlite db

export function fetchPlaces() {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM places `,
				[],
				(_, result) => {
					const places = [];

					for (const dp of result.rows._array) {
						places.push(
							new Place(
								dp.title,
								dp.imageUri,
								{
									address: dp.address,
									lat: dp.lat,
									lng: dp.lng,
								},
								dp.id
							)
						);
					}
					resolve(places);
				},
				(_, error) => reject(error)
			);
		});
	});
	return promise;
}

//fetch single place from db

export function fetchPlaceDetails(id) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM places WHERE id  = ?`,
				[id],
				(_, result) => {
					const dbPlace = result.rows._array[0];
					const place = new Place(
						dbPlace.title,
						dbPlace.imageUri,
						{
							address: dbPlace.address,
							lat: dbPlace.lat,
							lng: dbPlace.lng,
						},
						dbPlace.id
					);
					resolve(place);
				},
				(_, error) => reject(error)
			);
		});
	});
	return promise;
}
