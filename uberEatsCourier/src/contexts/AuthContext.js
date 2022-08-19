import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Courier } from "../models";

const AuthContext = createContext({}); //an emty object

// store data about auth user
const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbCourier, setdbCourier] = useState(null);
  // fixing login errror
  const [loading, setLoading] = useState(true);

  //   get sub from users
  const sub = authUser?.attributes?.sub;

  //   access to authenticated user
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  // when sub changes, query again: getti user by su
  useEffect(() => {
    if (!sub) {
      return;
    }
    DataStore.query(Courier, (courier) => user.sub("eq", sub)).then(
      (couriers) => {
        setdbCourier(couriers[0]);
        setLoading(false);
      }
    );
  }, [sub]);

  useEffect(() => {
    if (!dbCourier) {
      return;
    }
    const subscription = DataStore.observe(Courier, dbCourier.id).subscribe(
      (msg) => {
        if (msg.opType === "UPDATE") {
          setdbCourier(msg.element);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [dbCourier]);

  return (
    <AuthContext.Provider
      value={{ authUser, dbCourier, sub, setdbCourier, loading }}
    >
      {/* receiving props */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext); //auth hook for importing
