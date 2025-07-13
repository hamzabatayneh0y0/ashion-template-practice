export interface ProductType {
  productId: number | undefined;
  quantity: number;
  favorite: boolean;
  cart: boolean;
  size: string;
  color: string;
}

export interface StateType {
  userId: number | undefined;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password2?: string;
  country?: string;
  address?: string;
  apartment?: string;
  city?: string;
  phone?: string;
  img: string | ArrayBuffer;
  logedin: boolean;
  products: ProductType[];
}
export interface ActionType {
  type: string;
  payload?: {
    id?: number | undefined;
    quantity?: number;
    color?: string;
    size?: string;

    userimg?: string | ArrayBuffer;

    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    password2?: string;
    country?: string;
    address?: string;
    apartment?: string;
    city?: string;
    phone?: string;
  };
}
