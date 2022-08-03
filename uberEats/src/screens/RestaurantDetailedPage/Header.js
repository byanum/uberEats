import { View, Image, Text } from "react-native";
import styles from "./styles";
import React from "react";
import { Dish } from "../../models";
const DEFAULT_IMAGEE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg";
export default function RestaurantHeader({ restaurant }) {
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: restaurant.image.startsWith("http")
            ? restaurant.image
            : DEFAULT_IMAGEE,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* texts */}
      <View style={styles.container}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          $ {restaurant.deliveryFee.toFixed(1)} &#8226;{" "}
          {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime}
        </Text>
      </View>

      <View style={styles.menuTitle}>
        <Text>Menu</Text>
      </View>
    </View>
  );
}
