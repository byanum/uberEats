import { View, Image, Text } from "react-native";
import styles from "./styles";

export default function RestaurantHeader({ restaurant }) {
  return (
    <View style={styles.page}>
      <Image
        source={{ uri: restaurant.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* texts */}
      <View style={styles.container}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          $ {restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime}
        </Text>
      </View>

      <View style={styles.menuTitle}>
        <Text>Menu</Text>
      </View>
    </View>
  );
}
