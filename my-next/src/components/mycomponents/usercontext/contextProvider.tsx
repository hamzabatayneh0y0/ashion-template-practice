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
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    img: "/icon-7797704_640.png",
    country: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",

    logedin: false,

    products: [
      {
        productId: -1,
        quantity: 1,
        favorite: false,
        cart: false,
        size: "M",
        color: "black",
      },
    ],
  },
  dispatch: () => {},
});

const intialState: StateType = {
  userId: undefined,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  img: "/icon-7797704_640.png",
  country: "",
  address: "",
  apartment: "",
  city: "",
  phone: "",

  logedin: false,

  products: [
    {
      productId: -1,
      quantity: 1,
      favorite: false,
      cart: false,
      size: "M",
      color: "black",
    },
  ],
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
