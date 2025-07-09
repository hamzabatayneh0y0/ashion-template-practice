"use client";

import { StateType, ActionType, ProductType } from "./Type";
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
export default function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "set": {
      const user = localStorage.getItem("user");

      const userobj = user ? JSON.parse(user) : null;

      return userobj ? { ...userobj } : intialState;
    }
    case "cart": {
      const found = state.products.some((e) => {
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
      const found = state.products.some((e) => {
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
        name: action.payload?.username,
        email: action.payload?.useremail,
        password: action.payload?.userpassword,
        location: action.payload?.userlocation,
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

    default:
      return state;
  }
}
