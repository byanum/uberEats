import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketDish } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  //   check if w3e
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);

  //   querying basket
  useEffect(() => {
    DataStore.query(Basket, (b) => b.restaurantID("eq", dbUser.id)).then(
      (baskets) => setBasket(baskets[0])
    );
  }, [dbUser, restaurant]);

  const addDishToBasket = async (dish, quantity) => {
    //get the existing basket

    // new basket
    let theBasket = basket || (await createBasket());

    // add dishes to the basket
    DataStore.save(
      new BasketDish({ quantity, Dish: dish, basketID: theBasket.id })
    );
  };

  const createBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider value={{ addDishToBasket, setRestaurant }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

// hook
export const useBasketContext = () => useContext(BasketContext);
