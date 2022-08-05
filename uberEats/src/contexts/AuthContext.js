import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";
const AuthContext = createContext({}); //an emty object

// store data about auth user
const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setdbUser] = useState(null);
  //   get sub from users
  const sub = authUser?.attributes?.sub;

  //   access to authenticated user
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  // when sub changes, query again: getti user by su
  useEffect(() => {
    DataStore.query(User, (user) => user.sub("eq", sub)).then((users) =>
      setdbUser(users[0])
    );
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setdbUser }}>
      {/* receiving props */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext); //auth hook for importing
