import { StyleSheet, Text, View, Image } from "react-native";

const RestaurantItem = ({ restaurant }) => {
  return (
    <View style={styles.resturantContainer}>
      <Image
        source={{
          uri: restaurant.image,
        }}
        style={styles.image}
      />

      {/* for rating: to be on single line */}
      <View style={styles.row}>
        {/* Text views */}
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            $ {restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
            {restaurant.maxDeliveryTime} minutes
          </Text>
        </View>
        {/* Text views */}

        {/* rating */}
        <View style={styles.rating}>
          <Text>{restaurant.rating}</Text>
        </View>
      </View>
      {/* rating  */}
    </View>
  );
};

export default RestaurantItem;
const styles = StyleSheet.create({
  // Restaurant
  resturantContainer: {
    width: "100%",
    marginVertical: 10,
  },

  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgrey",
    borderRadius: 20,
    width: "10%",
    heigh: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },

  subtitle: {
    color: "grey",
  },
});
