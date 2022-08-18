import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Courier, Order } from "../models";
const OrderContext = createContext({}); //an emty object
import { useAuthContext } from "./AuthContext";
// store data about auth user
const OrderContextProvider = ({ children }) => {
  const { dbCourier } = useAuthContext();
  const [activeOrder, setActiveOrder] = useState();

  const acceptOrder = (order) => {
    // update the grren button: accepted in courier table
    DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = "ACCEPTED";
        updated.Courier = dbCourier;
      })
    ).then(setActiveOrder);
  };

  return (
    <OrderContext.Provider value={{ acceptOrder }}>
      {/* receiving props */}
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
export const useOrderContext = () => useContext(OrderContext); //auth hook for importing
