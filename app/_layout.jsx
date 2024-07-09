// Root Layout Component of the App.
// this file sets up global states and behaviors (like font loading and splash screen management), ensuring a consistent start across the app.

import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync(); // this ensures that the splash screen remains visible until certain conditions are met, typically until all resources (like fonts) have been loaded.

const RootLayout = () => {
	const [fontsLoaded, error] = useFonts({
		"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
		"Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
		"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		"Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
	}); // this hook from "expo-font" is used to load custom fonts from local assets. This is crucial for ensuring that the app displays correctly with the desired typography.

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	if (!fontsLoaded && !error) {
		return null;
	} // The component conditionally renders based on whether the fonts have finished loading (fontsLoaded) or if there was an error during loading (error). If the fonts haven't loaded yet, it returns null, effectively showing nothing until the fonts are ready.

	// the operator && returns the value of the first falsy operand encountered when evaluating from left to right, or the value of the last operand if they are all truthy.

	return (
		<>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				{/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
			</Stack>
		</>
	);
	// the <Stack> component manages a stack of screens, allowing users to navigate forward to new screens while pushing them onto the stack, and backward by popping screens off the stack.

	// Within the <Stack> component, a <Stack.Screen> component is defined with the name "index" and options to hide the header (options={{ headerShown: false }}). This configuration indicates that the screen named "index" should be part of the stack navigator but its header should not be displayed. This is done for the initial or home screen of an app to maximize the available space for content.
};

export default RootLayout; //this defines a RootLayout component that wraps around the entire application. This component is used as the top-level component in the app's entry point, ensuring that the font loading logic and splash screen management are applied globally.
