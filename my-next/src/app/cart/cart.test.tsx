import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "./page";

// Mock useUser
const mockDispatch = jest.fn();
const mockState = {
  products: [
    { productId: 1, cart: true, quantity: 2 },
    { productId: 2, cart: false, quantity: 1 },
  ],
};
jest.mock("@/components/mycomponents/usercontext/contextProvider", () => ({
  useUser: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "cart.nothingFound": "Nothing found",
      "cart.product": "Product",
      "cart.price": "Price",
      "cart.quantity": "Quantity",
      "cart.total": "Total",
    };
    return translations[`${key}`] || key;
  },
}));

// Mock child components
jest.mock("../loading", () => {
  const Loading = () => <div>Loading...</div>;
  Loading.displayName = "Loading";
  return Loading;
});
jest.mock("@/components/mycomponents/title/title", () => {
  const Title = () => <div>Title</div>;
  Title.displayName = "Title";
  return Title;
});
jest.mock("@/components/mycomponents/rate/rate", () => {
  const Rate = () => <div>Rate</div>;
  Rate.displayName = "Rate";
  return Rate;
});
jest.mock("@/components/mycomponents/currency/money", () => {
  const Money = (props: { m: number }) => <div>Money:{props.m}</div>;
  Money.displayName = "Money";
  return Money;
});
jest.mock("./quantity", () => {
  const QuantityComp = () => <div>QuantityComp</div>;
  QuantityComp.displayName = "QuantityComp";
  return QuantityComp;
});

// Mock fetch
const fakeProducts = [
  {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "/test.jpg",
    category: "cat",
    description: "desc",
    rating: { rate: 4.5, count: 10 },
  },
];
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeProducts),
    }) as Promise<Response>
);

describe("Cart component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loading initially", async () => {
    render(<Cart />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it("renders 'nothing found' if no cart products", async () => {
    (mockState as typeof mockState).products = [];
    render(<Cart />);
    await waitFor(() => {
      expect(screen.getByText("nothingFound")).toBeInTheDocument();
    });
  });

  it("renders products in cart", async () => {
    (mockState as typeof mockState).products = [
      { productId: 1, cart: true, quantity: 2 },
    ];
    render(<Cart />);
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("Money:100")).toBeInTheDocument(); // price cell
      expect(screen.getByText("QuantityComp")).toBeInTheDocument();
    });
  });

  it("clicking trash calls dispatch", async () => {
    (mockState as typeof mockState).products = [
      { productId: 1, cart: true, quantity: 2 },
    ];

    render(<Cart />);
    await waitFor(() => screen.getByText("Test Product"));
    const trashBtn = screen.getByTestId("trash-1");
    fireEvent.click(trashBtn);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cart",
        payload: { id: 1 },
      })
    );
  });
});
