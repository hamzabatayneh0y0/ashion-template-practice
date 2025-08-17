import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyAccount from "./page";
import userEvent from "@testing-library/user-event";
import Theme from "@/components/mycomponents/theme/theme";
// Mock useUser context
const mockDispatch = jest.fn();
const mockState = {
  first_name: "Hamza",
  last_name: "Batayneh",
  email: "hamza@example.com",
  password: "123456",
  country: "Jordan",
  city: "Irbid",
  address: "Some street",
  apartment: "10",
  phone: "0791234567",
  img: "/test-img.png",
  logedin: true,
};

jest.mock("@/components/mycomponents/title/title", () => {
  const MockTitle = () => <div data-testid="title">Title Component</div>;
  MockTitle.displayName = "MockTitle";
  return MockTitle;
});
jest.mock("@/components/mycomponents/usercontext/contextProvider", () => ({
  useUser: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));
jest.mock("next/headers", () => ({
  cookies: () => ({
    get: () => undefined,
    set: () => {},
    delete: () => {},
  }),
}));

// Mock other hooks used like useTheme and useCur if needed
// jest.mock("@/components/mycomponents/theme/theme", () => ({
//   useTheme: () => ({
//     theme: "light",
//     setTheme: jest.fn(),
//   }),
// }));

jest.mock("@/components/mycomponents/currency/currencyProvider", () => ({
  useCur: () => ({
    cur: "us",
    setCur: jest.fn(),
  }),
}));

// Mock next-intl translations
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key, // Just return key for simplicity
}));

describe("MyAccount Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders user info fields with correct initial values", () => {
    render(<MyAccount />);

    expect(screen.getByDisplayValue(mockState.first_name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.last_name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.password)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.country)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.city)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.address)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.apartment)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockState.phone)).toBeInTheDocument();

    const img = screen.getByAltText("user image") as HTMLImageElement;
    const urlParams = new URL(img.src).searchParams;
    const url = urlParams.get("url");

    expect(url).toBe(mockState.img);
  });

  it("toggles edit mode and enables input fields", () => {
    render(<MyAccount />);

    // Inputs should be readonly initially
    const firstNameInput = screen.getByDisplayValue(mockState.first_name);
    expect(firstNameInput).toHaveAttribute("readOnly");

    // Click edit button
    fireEvent.click(screen.getByText("edit_info"));

    // Inputs should be editable now
    expect(firstNameInput).not.toHaveAttribute("readOnly");
  });

  it("shows error on invalid save", () => {
    render(<MyAccount />);

    fireEvent.click(screen.getByText("edit_info"));

    const emailInput = screen.getByDisplayValue(mockState.email);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.click(screen.getByText("save_info"));

    expect(screen.getByText(/invalid_email/i)).toBeInTheDocument();
  });

  it("dispatches updateInfo on valid save", () => {
    render(<MyAccount />);

    fireEvent.click(screen.getByText("edit_info"));

    const emailInput = screen.getByDisplayValue(mockState.email);
    fireEvent.change(emailInput, {
      target: { value: "validemail@example.com" },
    });

    fireEvent.click(screen.getByText("save_info"));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "updateInfo",
        payload: expect.objectContaining({
          email: "validemail@example.com",
        }),
      })
    );
  });

  it("toggles password visibility", () => {
    render(<MyAccount />);

    fireEvent.click(screen.getByText("edit_info"));

    const passwordInput = screen.getByDisplayValue(mockState.password);
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByTestId("visibility"));

    expect(screen.getByDisplayValue(mockState.password)).toHaveAttribute(
      "type",
      "text"
    );
  });
  test("should add dark class to html when theme is dark", async () => {
    render(
      <Theme>
        <MyAccount />
      </Theme>
    );

    const select = screen.getByTestId("themeSelect");

    userEvent.selectOptions(select, "dark");

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.classList.contains("light")).toBe(false);
    });
  });

  test("should add light class to html when theme is light", async () => {
    render(
      <Theme>
        <MyAccount />
      </Theme>
    );

    const select = screen.getByTestId("themeSelect");

    userEvent.selectOptions(select, "light");

    await waitFor(() => {
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });
});
