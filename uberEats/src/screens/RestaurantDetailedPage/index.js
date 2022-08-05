import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

import DishItem from "../../components/DishListItem";
import RestaurantHeader from "./Header";
import styles from "./styles";
import React from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Restaurant, Dish } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

// import restaurants from "../../../assets/data/restaurants.json"; dummy
// const restaurant = restaurants[0]; dummy

export default function RestaurantDetailedPage() {
  const [restaurant, setRestaurant] = useState(null); //initializing with null because at start no restaurant was selected as F key//Fetching specific id
  const [dishes, setDishes] = useState([]);

  const route = useRoute(); //for passing id's
  const navigation = useNavigation();

  const id = route.params?.id;
  // console.warn(id);

  const {
    setRestaurant: setBasketRestaurant,
    basket,
    basketDishes,
  } = useBasketContext();

  useEffect(() => {
    // stop execution if id is undefined
    if (!id) {
      return;
    }
    // initailly it is null
    setBasketRestaurant(null);
    // Restaurant Detailed Header
    DataStore.query(Restaurant, id).then(setRestaurant);

    // Dish F keys
    DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
      setDishes
    );
  }, [id]);

  // when receive restaurant after fetching
  useEffect(() => {
    setBasketRestaurant(restaurant);
  }, [restaurant]);

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
      {/* button */}
      {/* display:  only if basket exists */}

      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.btnText}>
            Open Basket &#8226; {basketDishes.lenght}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
