import { FlatList, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurants from "../../../assets/data/restaurants.json";
import DishItem from "../../components/DishListItem";
import RestaurantHeader from "./Header";
import styles from "./styles";

import { useRoute, useNavigation } from "@react-navigation/native";

const restaurant = restaurants[0];

export default function RestaurantDetailedPage() {
  const route = useRoute(); //for passing id's
  const navigation = useNavigation();

  const id = route.params.id;
  console.warn(id);
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <RestaurantHeader restaurant={restaurant} />}
        data={restaurant.dishes}
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
