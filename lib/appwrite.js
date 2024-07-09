import { Account, Client, ID } from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.sakibmouin.aora",
	projectId: "668ccd0f0033a1b3730c",
	databaseId: "668cce1b00094f8a03a0",
	userCollectionId: "668cce340034234eae20",
	videoCollectionId: "668cce4d000e8f782a77",
	storageId: "668ccf51000fbdebdb0f",
};

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(config.endpoint) // Your Appwrite Endpoint
	.setProject(config.projectId) // Your project ID
	.setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
