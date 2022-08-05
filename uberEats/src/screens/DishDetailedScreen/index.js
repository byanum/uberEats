import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import RestaurantItem from "../../components/RestaurantItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

// import restaurants from "../../../assets/data/restaurants.json";
// const dish = restaurants[0].dishes[0]; //dummy data

export default function DishDetailed() {
  const state = useState();
  const navigation = useNavigation();
  const route = useRoute();

  // getting dish id
  const id = route.params?.id;

  const { addDishToBasket } = useBasketContext();

  const [dish, setDish] = useState(null);
  // destructure ES6
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // id is defined then query
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
  }, [id]);

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
  };

  //   functions
  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotal = () => {
    return (dish.price * quantity).toFixed(2);
  };

  if (!dish) {
    return <ActivityIndicator size={"large"} color="grey" />;
  }
  return (
    <View style={styles.page}>
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>

      <View style={styles.separator}></View>

      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          color={"black"}
          size={60}
          onPress={onMinus}
        />
        <Text style={styles.quantityStyle}>{quantity} </Text>
        <AntDesign
          name="pluscircleo"
          color={"black"}
          size={60}
          onPress={onPlus}
        />
      </View>

      {/* button */}
      <Pressable onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.btnText}>
          Add {quantity} to basket &#8226; $ {getTotal()}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "grey",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityStyle: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    marginTop: "auto",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
