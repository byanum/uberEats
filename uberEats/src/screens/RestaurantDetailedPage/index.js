import { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

import DishItem from "../../components/DishListItem";
import RestaurantHeader from "./Header";
import styles from "./styles";
import React from "react";
import { DataStore } from "aws-amplify";
import { Restaurant, Dish } from "../../models";

// import restaurants from "../../../assets/data/restaurants.json"; dummy
// const restaurant = restaurants[0]; dummy

export default function RestaurantDetailedPage() {
  const [restaurant, setRestaurant] = useState(null); //initializing with null because at start no restaurant was selected as F key//Fetching specific id
  const [dishes, setDishes] = useState([]);

  const route = useRoute(); //for passing id's
  const navigation = useNavigation();

  const id = route.params?.id;
  // console.warn(id);

  useEffect(() => {
    // stop execution if id is undefined
    if (!id) {
      return;
    }
    // Restaurant Detailed Header
    DataStore.query(Restaurant, id).then(setRestaurant);

    // Dish F keys
    DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
      setDishes
    );
  }, [id]);

  if (!restaurant) {
    return <ActivityIndicator size={"large"} color="grey" />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <RestaurantHeader restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishItem dish={item} />}
        keyExtractor={(item) => item.name}
      />

      <View style={styles.iconContainer}>
        <Ionicons
          name="arrow-back-circle"
          size={45}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
