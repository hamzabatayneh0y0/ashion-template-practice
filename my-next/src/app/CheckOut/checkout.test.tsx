import { render, screen } from "@testing-library/react";
import CheckOut from "./page"; // adjust path to your CheckOut.tsx
import "@testing-library/jest-dom";

// Mock child components so we don’t care about their internal render
jest.mock("@/components/mycomponents/title/title", () => {
  const MockTitle = () => <div data-testid="title">Title Component</div>;
  MockTitle.displayName = "MockTitle";
  return MockTitle;
});
jest.mock("./form", () => {
  const MockForm = () => <div data-testid="form">Form Component</div>;
  MockForm.displayName = "MockForm";
  return MockForm;
});
type OrdersProps = { products: Array<unknown> };

jest.mock("./orders", () => {
  const MockOrders = ({ products }: OrdersProps) => (
    <div data-testid="orders">{`Orders with ${products.length} products`}</div>
  );
  MockOrders.displayName = "MockOrders";
  return MockOrders;
});
jest.mock("../loading", () => {
  const MockLoading = () => <div data-testid="loading">Loading...</div>;
  MockLoading.displayName = "MockLoading";
  return MockLoading;
});

describe("CheckOut component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    render(await CheckOut());

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders Title, Form, and Order when fetch succeeds", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product 1",
        category: "",
        description: "",
        image: "",
        price: 10,
        rating: { count: 0, rate: 0 },
      },
      {
        id: 2,
        title: "Product 2",
        category: "",
        description: "",
        image: "",
        price: 20,
        rating: { count: 0, rate: 0 },
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    render(await CheckOut());

    // Check child components
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("orders")).toHaveTextContent(/2 products/i);
  });
});
