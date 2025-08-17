import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Actions from "./actions";

// mock context
const mockDispatch = jest.fn();
const mockState = {
  products: [
    {
      productId: 1,
      favorite: false,
      cart: false,
      quantity: 1,
    },
  ],
};

jest.mock("@/components/mycomponents/usercontext/contextProvider", () => ({
  useUser: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

// mock translations
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Actions component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders quantity and allows increment/decrement", () => {
    render(<Actions id={1} />);

    expect(screen.getByText(/product.quantity/i)).toBeInTheDocument();

    // starts with quantity 1
    expect(screen.getByText("1")).toBeInTheDocument();

    // increment
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("2")).toBeInTheDocument();

    // decrement
    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("dispatches cart action and shows toast", async () => {
    render(<Actions id={1} />);

    const btn = screen.getByText("product.addToCart");
    fireEvent.click(btn);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cart",
      payload: { id: 1, size: "", color: "", quantity: 1 },
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Added to cart|removed from cart/i)
      ).toBeInTheDocument();
    });
  });

  it("dispatches favorite action when heart clicked", () => {
    render(<Actions id={1} />);

    const heart = screen.getByRole("img", { hidden: true }); // GoHeart is svg
    fireEvent.click(heart);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "favorite",
      payload: { id: 1, size: "", color: "", quantity: 1 },
    });
  });

  it("selects size and applies active class", () => {
    render(<Actions id={1} />);

    const sizeM = screen.getByText("M");
    fireEvent.click(sizeM);

    expect(sizeM).toHaveClass("text-red-500");
  });

  it("selects color and applies outline", () => {
    render(<Actions id={1} />);

    const redCircle =
      screen.getByTestId("color-red") ||
      screen.getByText("", { selector: "span[style]" });
    fireEvent.click(redCircle);

    expect(redCircle).toHaveClass("outline-red-500");
  });
});
