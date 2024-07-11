import { router } from "expo-router";
import {
	Account,
	Client,
	ID,
	Avatars,
	Databases,
	Query,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.sakibmouin.aora",
	projectId: "668ccd0f0033a1b3730c",
	databaseId: "668cce1b00094f8a03a0",
	userCollectionId: "668cce340034234eae20",
	videoCollectionId: "668cce4d000e8f782a77",
	storageId: "668ccf51000fbdebdb0f",
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(endpoint) // Your Appwrite Endpoint
	.setProject(projectId) // Your project ID
	.setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			databaseId,
			userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		throw new Error(error);
	}
}

// Sign In
export async function signIn(email, password) {
	try {
		let session = await account.getSession(); // Attempt to get the current session
		if (session) {
			router.replace("/home");
			// Optionally, redirect to a dashboard or home page instead of logging in again
		} else {
			// Proceed with login
			await account.createEmailSession(email, password);
		}
	} catch (error) {
		if (
			error.message.includes(
				"creation of a session is prohibited when a session is active"
			)
		) {
			console.log("Active session detected. Cannot create a new one.");
			// Handle the error, possibly redirecting the user to a dashboard or home page
		} else {
			console.error(error);
		}
	}
}

// Get Account
export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
}

// Get Current User
export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount();
		if (!currentAccount) throw Error;

		const id = currentAccount.$id;

		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getAllPosts() {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId);

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
}

export async function getLatestPosts() {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc("$createdAt"),
			Query.limit(7),
		]);

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
}
