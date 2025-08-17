import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Products from "./fetchproducts";

// Mock Loading component
jest.mock("@/components/mycomponents/loader/loading", () => {
  const MockLoading = () => <div data-testid="loading">Loading...</div>;
  MockLoading.displayName = "Loading";
  return MockLoading;
});

// Mock ProductCard to simplify
type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: { count: number; rate: number };
};

jest.mock("@/components/mycomponents/productCard/productCard", () => ({
  __esModule: true,
  default: ({ product }: { product: Product }) => <div>{product.title}</div>,
}));

// Mock next-intl useTranslations
jest.mock("next-intl", () => ({
  useTranslations: () => {
    const fn = (key: string) => key;
    fn.has = (key: string) => true;
    return fn;
  },
}));

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    description: "Desc 1",
    category: "jewelery",
    image: "img1.png",
    price: 50,
    rating: { count: 10, rate: 4.5 },
  },
  {
    id: 2,
    title: "Product 2",
    description: "Desc 2",
    category: "men's clothing",
    image: "img2.png",
    price: 100,
    rating: { count: 5, rate: 3.5 },
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Products Component", () => {
  it("shows mocked Loading initially", () => {
    (global.fetch as jest.Mock) = jest.fn(() => new Promise(() => {}));
    render(<Products cat="all" price={200} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders products after fetch", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    render(<Products cat="all" price={200} />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("shows not found if no products match filter", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    render(<Products cat="electronics" price={10} />);

    await waitFor(() => {
      expect(screen.getByText("notFound")).toBeInTheDocument();
    });
  });

  it("handles fetch error gracefully", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
    });

    render(<Products cat="all" price={200} />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });
});
