import { render, screen, fireEvent } from "@testing-library/react";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import "@testing-library/jest-dom";
import Order from "./orders";
import CurrencyProvider from "@/components/mycomponents/currency/currencyProvider";
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/components/mycomponents/usercontext/contextProvider", () => ({
  useUser: jest.fn(),
}));
jest.mock("next/headers", () => ({
  cookies: () => ({
    get: () => undefined,
    set: () => {},
    delete: () => {},
  }),
}));

const mockProducts = [
  {
    id: 1,
    title: "Product One",
    price: 100,
    description: "",
    category: "",
    image: "",
    rating: { count: 10, rate: 4.5 },
  },
  {
    id: 2,
    title: "Product Two",
    price: 200,
    description: "",
    category: "",
    image: "",
    rating: { count: 5, rate: 4.0 },
  },
];

const mockCartState = {
  logedin: false,
  products: [
    { productId: 1, cart: true, quantity: 2 },
    { productId: 2, cart: true, quantity: 1 },
  ],
};

describe("Order component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useUser as jest.Mock).mockReturnValue({ state: mockCartState });
  });

  it("renders all cart products with correct total", () => {
    render(
      <CurrencyProvider c="us">
        <Order products={mockProducts} />
      </CurrencyProvider>
    );
    // Check titles and quantities
    expect(screen.getByText(/1 Product One \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Product Two \(1\)/i)).toBeInTheDocument();

    expect(screen.getAllByText(/200/i)).toHaveLength(2); // 2 x 100
    expect(screen.getByText(/400/i)).toBeInTheDocument(); // total
  });

  it("shows create account checkbox if user is not logged in", () => {
    render(
      <CurrencyProvider c="us">
        <Order products={mockProducts} />
      </CurrencyProvider>
    );
    expect(screen.getByLabelText(/create_account/i)).toBeInTheDocument();
  });

  it("allows switching between payment methods", () => {
    render(
      <CurrencyProvider c="us">
        <Order products={mockProducts} />
      </CurrencyProvider>
    );
    const chequeRadio = screen.getByLabelText(/cheque_payment/i);
    const paypalRadio = screen.getByLabelText(/paypal/i);

    // Default: PayPal selected
    expect(paypalRadio).toBeChecked();
    expect(chequeRadio).not.toBeChecked();

    // Switch to Cheque
    fireEvent.click(chequeRadio);
    expect(chequeRadio).toBeChecked();
    expect(paypalRadio).not.toBeChecked();
  });

  it("renders submit button with correct label", () => {
    render(
      <CurrencyProvider c="us">
        <Order products={mockProducts} />
      </CurrencyProvider>
    );
    expect(
      screen.getByRole("button", { name: /place_order/i })
    ).toBeInTheDocument();
  });
});
