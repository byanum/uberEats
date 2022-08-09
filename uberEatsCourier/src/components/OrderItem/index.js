import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
// import orders from "../../../assets/data/orders.json";

// const order = orders[0];

const OrderItem = ({ order }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("OrderDelivery", { id: order.id })}
    >
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: order.Restaurant.image }} />
        <View style={styles.textContainer}>
          <Text style={{ color: "black", fontWeight: "500" }}>
            {order.Restaurant.name}
          </Text>
          <Text>{order.Restaurant.address}</Text>

          {/* User Details */}
          <Text style={{ marginTop: 15, color: "black", fontWeight: "500" }}>
            Delivery Details
          </Text>
          <Text>{order.User.name}</Text>
          <Text>{order.User.address}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo
            style={styles.iconStyle}
            name="check"
            size={30}
            color="white"
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </Pressable>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
  img: {
    width: "25%",
    height: "100%",
    borderRadius: 10,
  },
  imgContainer: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    margin: 10,
    flexDirection: "row",
    borderColor: "lightgreen",
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "300",
    color: "grey",
    paddingVertical: 5,
  },
  iconContainer: {
    backgroundColor: "lightgreen",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  iconStyle: {
    marginLeft: "auto",
  },
});
