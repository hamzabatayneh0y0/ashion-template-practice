import { render, screen, fireEvent } from "@testing-library/react";
import Regester from "@/app/register/page";
import { useRouter } from "next/navigation";
import UserProvider from "@/components/mycomponents/usercontext/contextProvider";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Register Component", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  function renderComponent() {
    render(
      <UserProvider>
        <Regester />
      </UserProvider>
    );
  }

  it("renders all form inputs", () => {
    renderComponent();
    const expectedFields = [
      "first_name",
      "last_name",
      "email",
      "password",
      "password2",
      "country",
      "address",
      "apartment",
      "city",
      "phone",
    ];

    expectedFields.forEach((field) => {
      expect(screen.getByPlaceholderText(field)).toBeInTheDocument();
    });
  });

  it("shows error on invalid form", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "register" }));

    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it("submits valid form and redirects", () => {
    renderComponent();

    const validData = {
      first_name: "Hamza",
      last_name: "Batayneh",
      email: "hamza@example.com",
      password: "12345678",
      password2: "12345678",
      country: "Jordan",
      address: "Irbid",
      apartment: "4",
      city: "Irbid",
      phone: "0788888888",
    };

    Object.entries(validData).forEach(([key, value]) => {
      const input = screen.getByPlaceholderText(key);
      fireEvent.change(input, { target: { value } });
    });

    fireEvent.click(screen.getByRole("button", { name: "register" }));

    expect(push).toHaveBeenCalledWith("/");
  });

  it("toggles password visibility", () => {
    renderComponent();

    const toggleButton = screen.getByRole("button", { name: "show_password" });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(
      screen.getByRole("button", { name: "hide_password" })
    ).toBeInTheDocument();
  });
});
