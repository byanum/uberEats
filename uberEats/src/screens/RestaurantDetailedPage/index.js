import { FlatList, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurants from "../../../assets/data/restaurants.json";
import DishItem from "../../components/DishListItem";
import RestaurantHeader from "./Header";
import styles from "./styles";
const restaurant = restaurants[0];

export default function RestaurantDetailedPage() {
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <RestaurantHeader restaurant={restaurant} />}
        data={restaurant.dishes}
        renderItem={({ item }) => <DishItem dish={item} />}
      />

      <View style={styles.iconContainer}>
        <Ionicons name="arrow-back-circle" size={45} color="white" />
      </View>
    </View>
  );
}
