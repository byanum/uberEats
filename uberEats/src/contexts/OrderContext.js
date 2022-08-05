import { createContext, useContext, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish, Basket } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbuser } = useAuthContext();
  const { restaurant, totalPrice, basketDishes, basket } = useBasketContext();

  // querying orders and saving them into state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID("eq", dbuser.id)).then(setOrders);
  }, [dbuser]);
  // create order function
  const createOrder = async () => {
    // console.warn("mobile apps");
    // create order
    const newOrder = await DataStore.save(
      new Order({
        userID: dbuser.id,
        Restaurant: restaurant,
        status: "NEW",
        total: totalPrice,
      })
    );

    // add all basket dishes to the order
    await Promise.all(
      basketDishes.map((basketDish) =>
        DataStore.save(
          new OrderDish({
            quantity: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.Dish,
          })
        )
      )
    );

    // delete the basket
    await DataStore.delete(basket);

    // set orderw with all the orders plus all the  new created
    setOrders([...orders, newOrder]);
  };

  const getOrder = async (id) => {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, (od) =>
      od.orderID("eq", id)
    );

    return { ...order, dishes: orderDishes };
  };

  return (
    <OrderContext.Provider value={{ createOrder, orders, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
