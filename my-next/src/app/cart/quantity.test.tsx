import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import Quantity from "./quantity";

// Mock Money component
jest.mock("@/components/mycomponents/currency/money", () => {
  return function MockMoney({ m }: { m: number }) {
    return <div data-testid="money">{m}</div>;
  };
});

// Mock useUser
const mockDispatch = jest.fn();
jest.mock("@/components/mycomponents/usercontext/contextProvider", () => ({
  useUser: () => ({
    dispatch: mockDispatch,
  }),
}));

describe("Quantity component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial quantity and Money correctly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <Quantity id={1} price={10} quantity={3} />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByTestId("money")).toHaveTextContent("30"); // 3 * 10
  });

  it("increases quantity when + is clicked", () => {
    render(
      <table>
        <tbody>
          <tr>
            <Quantity id={1} price={10} quantity={2} />
          </tr>
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("3")).toBeInTheDocument(); // quantity updated
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: "update",
      payload: { id: 1, quantity: 3 },
    });
  });

  it("decreases quantity when - is clicked but not below 1", () => {
    render(
      <table>
        <tbody>
          <tr>
            <Quantity id={1} price={10} quantity={1} />
          </tr>
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("1")).toBeInTheDocument(); // stays at 1
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: "update",
      payload: { id: 1, quantity: 1 },
    });
  });
});
