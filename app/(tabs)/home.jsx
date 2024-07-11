import { FlatList, View, Text, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";

import { images } from "../../constants";

import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Home = () => {
	const { data: posts, refetch } = useAppwrite(getAllPosts);
	const { data: latestPosts } = useAppwrite(getLatestPosts);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<VideoCard
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item.users.username}
						avatar={item.users.avatar}
					/>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">
									Welcome Back
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									Mouin
								</Text>
							</View>
							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="w-9 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>
						<SearchInput />

						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-lg font-pregular text-gray-100 mb-3">
								Latest Videos
							</Text>

							<Trending posts={latestPosts ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found"
						subtitle="No videos created yet"
					/>
				)}
				// refreshControl={
				// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				// }
			/>
		</SafeAreaView>
	);
};

export default Home;
