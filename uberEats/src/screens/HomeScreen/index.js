import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import RestaurantItem from "../../components/RestaurantItem";
// import restaurants from "../../../assets/data/restaurants.json";
import { DataStore } from "@aws-amplify/datastore";
import { Restaurant } from "../../models";

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]); //Fetching 1

  useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurants);
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
