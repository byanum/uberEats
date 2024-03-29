import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Courier, Order, User, OrderDish } from "../models";
const OrderContext = createContext({}); //an emty object
import { useAuthContext } from "./AuthContext";
// store data about auth user
const OrderContextProvider = ({ children }) => {
  const { dbCourier } = useAuthContext();
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [dishes, setDishes] = useState([]);

  // query user when we have the order
  const fetchOrder = async (id) => {
    if (!id) {
      setOrder(null);
      return;
    }
    // query the orders
    const fetchedOrder = await DataStore.query(Order, id);
    setOrder(fetchedOrder);
    // where user's & order's ID matches
    DataStore.query(User, fetchedOrder.userID).then(setUser);

    // where order & orderDish ID matches
    DataStore.query(OrderDish, (od) => od.orderID("eq", fetchedOrder.id)).then(
      setDishes
    );
  };

  // Real time Synchronization
  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe(
      ({ opType, element }) => {
        if (opType === "UPDATE") {
          fetchOrder(element.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [order?.id]);

  const acceptOrder = async () => {
    // update the grren button: accepted in courier table
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = "ACCEPTED";
        updated.Courier = dbCourier;
      })
    );
    setOrder(updatedOrder);
  };

  const pickUpOrder = async () => {
    // update the grren button: accepted in courier table
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = "PICKED_UP";
        updated.Courier = dbCourier;
      })
    );
    setOrder(updatedOrder);
  };

  const completeOrder = async () => {
    // update the grren button: accepted in courier table
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = "COMPLETED";
        updated.Courier = dbCourier;
      })
    );
    setOrder(updatedOrder);
  };

  return (
    <OrderContext.Provider
      value={{
        acceptOrder,
        fetchOrder,
        order,
        user,
        dishes,
        pickUpOrder,
        completeOrder,
      }}
    >
      {/* receiving props */}
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
export const useOrderContext = () => useContext(OrderContext); //auth hook for importing
