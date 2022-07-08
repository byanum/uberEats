import { StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RestaurantItem from "../../components/RestaurantItem";
import restaurants from "../../../assets/data/restaurants.json";

// Connection with RestaurantDetailedPage
export default function DishItem({ dish }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {dish.description}
        </Text>
        <Text style={styles.price}>{dish.price}</Text>
      </View>
      {/* logic :if image exists then show */}
      {dish.image && (
        <Image source={{ uri: dish.image }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.8,
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "grey",
    marginVertical: 5,
  },
  price: {
    fontSize: 15,
  },
  image: {
    height: 80,
    aspectRatio: 1,
  },
});
