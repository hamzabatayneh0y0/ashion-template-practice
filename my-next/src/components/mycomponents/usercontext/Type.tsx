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
  name: string;
  email: string;
  password: string;
  img: string | ArrayBuffer;
  logedin: boolean;
  location: {
    country: string;
    city: string;
  };
  products: ProductType[];
}
export interface ActionType {
  type: string;
  payload?: {
    id?: number | undefined;
    quantity?: number;
    color?: string;
    size?: string;
    username?: string;
    useremail?: string;
    userpassword?: string;
    userlocation?: {
      country?: string;
      city?: string;
    };
    userimg?: string | ArrayBuffer;
  };
}
