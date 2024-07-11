// Import necessary modules from React and React Native
import { Alert } from "react-native";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch data from Appwrite using a provided function.
 * Manages loading state and provides a refetch capability.
 */
// @param {Function} fn - The function to execute for fetching data. Expected to return a promise.
// @returns {Object} An object containing fetched data, loading state, and a refetch function.

const useAppwrite = (fn) => {
	// Initialize state for storing fetched data
	const [data, setData] = useState([]);

	// Initialize state for tracking loading status
	const [loading, setLoading] = useState(true);

	/**
	 * Function to fetch data using the provided function.
	 * Sets loading state to true before starting the fetch, updates data state with fetched data or shows an alert on error,
	 * and sets loading state to false after completion.
	 */
	const fetchData = async () => {
		setLoading(true); // Indicate loading started
		try {
			// Execute the provided fetch function and update data state with the result
			const res = await fn();
			setData(res);
		} catch (error) {
			// Show an alert dialog with the error message if fetching fails
			Alert.alert("Error", error.message);
		} finally {
			setLoading(false); // Indicate loading finished
		}
	};

	/**
	 * Effect hook to execute fetchData when the component mounts or the fetch function changes.
	 */
	useEffect(() => {
		fetchData(); // Call fetchData when dependencies change
	}, [fn]); // Dependency array, causing re-execution if fn changes

	/**
	 * Function to manually trigger refetching of data.
	 * Simply calls fetchData again.
	 */
	const refetch = () => fetchData();

	// Return data, loading state, and refetch function for use in components
	return { data, loading, refetch };
};

export default useAppwrite;
