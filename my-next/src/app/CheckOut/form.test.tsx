import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useUser } from "@/components/mycomponents/usercontext/contextProvider";
import FormCheckOut from "./form";

// Mock الترجمة
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock context
jest.mock("@/components/mycomponents/usercontext/contextProvider", () => ({
  useUser: jest.fn(),
}));

describe("FormCheckOut", () => {
  const dispatch = jest.fn();

  const mockLoggedOutState = {
    state: {
      logedin: false,
      products: [],
    },
    dispatch,
  };

  const validForm = {
    first_name: "Hamza",
    last_name: "Batayneh",
    country: "Jordan",
    address: "Irbid",
    apartment: "5",
    city: "Irbid",
    postcode: "21110",
    phone: "0788888888",
    email: "hamza@example.com",
    account: true,
    password: "12345678",
    note: false,
    order_notes: "",
    coupon: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUser as jest.Mock).mockReturnValue(mockLoggedOutState);
  });

  function fillForm(data: typeof validForm) {
    Object.entries(data).forEach(([key, val]) => {
      const input =
        screen.queryByRole("textbox", { name: new RegExp(key, "i") }) ||
        screen.queryByLabelText(new RegExp(key, "i")) ||
        screen.queryByRole("checkbox", { name: new RegExp(key, "i") });
      if (!input) {
        console.warn(`No input found for key: ${key}`);
        return;
      }
      if (typeof val === "string") {
        fireEvent.change(input, { target: { value: val } });
      } else if (typeof val === "boolean") {
        fireEvent.click(input);
      }
    });
  }

  it("should render all inputs", () => {
    render(<FormCheckOut />);

    expect(screen.getByLabelText("first_name")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("should show validation error on empty submit", async () => {
    render(<FormCheckOut />);
    const form = screen.getByRole("form") || screen.getByTestId("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/required|is not allowed/i)).toBeInTheDocument();
    });
  });

  it("should submit successfully and show success alert", async () => {
    render(<FormCheckOut />);
    fillForm(validForm);

    fireEvent.submit(
      screen.getByRole("form", { hidden: true }) || screen.getByTestId("form")
    );

    await waitFor(() => {
      expect(screen.getByText("Done")).toBeInTheDocument();
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "register",
          payload: expect.objectContaining({
            email: "hamza@example.com",
          }),
        })
      );
    });
  });
});
