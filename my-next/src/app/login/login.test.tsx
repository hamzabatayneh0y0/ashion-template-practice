// __tests__/Login.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/login/page"; // adjust path as needed

import { useRouter } from "next/navigation";
import UserProvider from "@/components/mycomponents/usercontext/contextProvider";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock translations
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Login Page", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    localStorage.clear();
  });

  it("renders login form", () => {
    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );

    expect(
      screen.getByPlaceholderText("email_placeholder")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("password_placeholder")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("login_button")).toBeDisabled();
  });

  it("shows error if fields are empty", async () => {
    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );

    expect(screen.getByDisplayValue("login_button")).toBeDisabled();
  });

  it("shows error on invalid credentials", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ email: "test@test.com", password: "123456" })
    );

    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("email_placeholder"), {
      target: { value: "wrong@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password_placeholder"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByDisplayValue("login_button"));

    expect(
      screen.getByText("Email or Password is not correct")
    ).toBeInTheDocument();
  });

  it("logs in with correct credentials", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ email: "test@test.com", password: "123456" })
    );

    render(
      <UserProvider>
        <Login />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("email_placeholder"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password_placeholder"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByDisplayValue("login_button"));

    expect(push).toHaveBeenCalledWith("/");
  });
});
