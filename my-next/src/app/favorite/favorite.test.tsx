import { render, screen, waitFor } from "@testing-library/react";
import Favorite from "./page";
import "@testing-library/jest-dom";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../loading", () => {
  const MockLoading = () => <div data-testid="loading">Loading...</div>;
  MockLoading.displayName = "MockLoading";
  return MockLoading;
});

jest.mock("@/components/mycomponents/title/title", () => {
  const MockTitle = () => <div data-testid="title">Title Component</div>;
  MockTitle.displayName = "MockTitle";
  return MockTitle;
});
jest.mock("@/components/mycomponents/productCard/productCard", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockProductCard = ({ product }: { product: any }) => (
    <div data-testid="product-card">{product.title}</div>
  );
  MockProductCard.displayName = "productCard";
  return MockProductCard;
});

// mock useUser hook
type ProductState = {
  productId: number;
  favorite: boolean;
  cart: boolean;
  quantity: number;
};

const mockState: { products: ProductState[] } = {
  products: [],
};
jest.mock("@/components/mycomponents/usercontext/contextProvider", () => ({
  useUser: () => ({
    state: mockState,
  }),
}));

describe("Favorite component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows Loading initially", () => {
    // render before fetch completes
    render(<Favorite />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("shows 'nothing found' message when no favorite products", async () => {
    mockState.products = []; // no favorites
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "Product 1",
          category: "",
          description: "",
          image: "",
          price: 10,
          rating: { count: 0, rate: 0 },
        },
      ],
    });

    render(<Favorite />);

    await waitFor(() => {
      expect(screen.getByText(/nothing_found/i)).toBeInTheDocument();
    });
  });

  it("renders favorite product cards correctly", async () => {
    mockState.products = [
      { productId: 1, favorite: true, cart: false, quantity: 1 },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "Favorite Product",
          category: "",
          description: "",
          image: "",
          price: 10,
          rating: { count: 0, rate: 0 },
        },
        {
          id: 2,
          title: "Other Product",
          category: "",
          description: "",
          image: "",
          price: 20,
          rating: { count: 0, rate: 0 },
        },
      ],
    });

    render(<Favorite />);

    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument();
      const cards = screen.getAllByTestId("product-card");
      expect(cards).toHaveLength(1);
      expect(cards[0]).toHaveTextContent("Favorite Product");
    });
  });
});
