"use client";

import { StateType, ActionType, ProductType } from "./Type";
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
export default function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "set": {
      const user = localStorage.getItem("user");

      const userobj = user ? JSON.parse(user) : null;

      return userobj ? { ...userobj } : intialState;
    }
    case "cart": {
      const found = state.products?.some((e) => {
        return action.payload?.id == e.productId;
      });

      let updatedProducts;

      if (found) {
        updatedProducts = state.products.map((e) => {
          if (e.productId === action.payload?.id) {
            return {
              ...e,
              quantity: action.payload?.quantity || e.quantity,
              cart: !e.cart,
              size: action.payload?.size || e.size,
              color: action.payload?.color || e.color,
            };
          }
          return e;
        });
      } else {
        const product: ProductType = {
          productId: action.payload?.id,
          quantity: action.payload?.quantity || 1,
          favorite: false,
          cart: true,
          size: action.payload?.size || "M",
          color: action.payload?.color || "black",
        };
        updatedProducts = [...state.products, product];
      }

      const cleanedProducts = updatedProducts.filter(
        (e) => e.favorite || e.cart
      );
      const newstate = { ...state, products: cleanedProducts };
      localStorage.setItem("user", JSON.stringify(newstate));
      return { ...newstate };
    }

    case "favorite": {
      const found = state.products?.some((e) => {
        return action.payload?.id == e.productId;
      });

      let updatedProducts;

      if (found) {
        updatedProducts = state.products.map((e) => {
          if (e.productId === action.payload?.id) {
            return {
              ...e,
              favorite: !e.favorite,
              size: action.payload?.size || e.size,
              color: action.payload?.color || e.color,
            };
          }
          return e;
        });
      } else {
        const product: ProductType = {
          productId: action.payload?.id,
          quantity: 1,
          favorite: true,
          cart: false,
          size: action.payload?.size || "M",
          color: action.payload?.color || "black",
        };
        updatedProducts = [...state.products, product];
      }
      const cleanedProducts = updatedProducts.filter(
        (e) => e.favorite || e.cart
      );

      const newstate = { ...state, products: cleanedProducts };
      localStorage.setItem("user", JSON.stringify(newstate));
      return { ...newstate };
    }
    case "update": {
      const updatedProducts = state.products.map((e) => {
        if (e.productId === action.payload?.id) {
          return {
            ...e,
            size: action.payload?.size || e.size,
            color: action.payload?.color || e.color,
            quantity: action.payload?.quantity || e.quantity,
          };
        }
        return e;
      });

      const newstate = { ...state, products: updatedProducts };
      localStorage.setItem("user", JSON.stringify(newstate));
      return { ...newstate };
    }
    case "updateInfo": {
      const newstate = {
        ...state,
        first_name: action.payload?.first_name || state.first_name,
        last_name: action.payload?.last_name || state.last_name,
        email: action.payload?.email || state.email,
        password: action.payload?.password || state.password,
        country: action.payload?.country || state.country,
        address: action.payload?.address || state.address,
        apartment: action.payload?.apartment || state.apartment,
        city: action.payload?.city || state.city,
        phone: action.payload?.phone || state.phone,
      };
      localStorage.setItem("user", JSON.stringify(newstate));
      return newstate;
    }
    case "img": {
      const newstate = {
        ...state,
        img: action.payload?.userimg || "/icon-7797704_640.png",
      };
      localStorage.setItem("user", JSON.stringify(newstate));
      return newstate;
    }
    case "delete": {
      const newstate = {
        ...intialState,
      };
      localStorage.setItem("user", JSON.stringify(newstate));
      return intialState;
    }
    case "register": {
      const newstate = {
        userId: Date.now(),
        first_name: action.payload?.first_name,
        last_name: action.payload?.last_name,
        email: action.payload?.email,
        password: action.payload?.password,
        password2: action.payload?.password2,
        country: action.payload?.country,
        address: action.payload?.address,
        apartment: action.payload?.apartment,
        city: action.payload?.city,
        phone: action.payload?.phone,
        img: "/icon-7797704_640.png",
        logedin: true,
        products: [],
      };

      localStorage.setItem("user", JSON.stringify(newstate));
      return newstate;
    }
    case "logout": {
      const newstate = { ...state, logedin: false };
      localStorage.setItem("user", JSON.stringify(newstate));
      return newstate;
    }
    case "login": {
      const newstate = { ...state, logedin: true };
      localStorage.setItem("user", JSON.stringify(newstate));
      return newstate;
    }
    default:
      return state;
  }
}
