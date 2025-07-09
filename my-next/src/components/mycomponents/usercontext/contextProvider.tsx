"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer from "./reducer";
import { StateType, ActionType } from "./Type";

interface userContextType {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}

export const userContext = createContext<userContextType>({
  state: {
    userId: undefined,
    name: "",
    email: "",
    password: "",
    img: "/icon-7797704_640.png",

    logedin: true,
    location: {
      country: "",
      city: "",
    },
    products: [
      {
        productId: undefined,
        quantity: 0,
        favorite: false,
        cart: false,
        size: "",
        color: "",
      },
    ],
  },
  dispatch: () => {},
});

const intialState: StateType = {
  userId: 123,
  name: "Hamza Batayneh",
  email: "example@gmail.com",
  password: "12345",
  img: "/icon-7797704_640.png",

  logedin: true,
  location: {
    country: "joradan",
    city: "irbid",
  },
  products: [],
};
export default function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, intialState);
  useEffect(() => {
    dispatch({ type: "set" });
  }, []);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}
export function useUser() {
  const { state, dispatch } = useContext(userContext);
  return { state, dispatch };
}
