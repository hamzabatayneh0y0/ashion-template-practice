// Contact.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "./page";

// mock the translation hook from next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key, // returns the key directly
}));

// mock Title component so it doesn't require its own context
jest.mock("@/components/mycomponents/title/title", () => {
  const Title = () => <div>Title</div>;
  Title.displayName = "Title";
  return Title;
});
describe("Contact component", () => {
  it("fills and submits the form, then clears fields", () => {
    render(<Contact />);

    // Fill in inputs
    fireEvent.change(screen.getByPlaceholderText("name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("website"), {
      target: { value: "https://example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("message"), {
      target: { value: "Hello there!" },
    });

    // Check that the values are updated
    expect(screen.getByPlaceholderText("name")).toHaveValue("John Doe");
    expect(screen.getByPlaceholderText("email")).toHaveValue(
      "john@example.com"
    );
    expect(screen.getByPlaceholderText("website")).toHaveValue(
      "https://example.com"
    );
    expect(screen.getByPlaceholderText("message")).toHaveValue("Hello there!");

    // Submit the form
    fireEvent.submit(
      screen.getByRole("form", { hidden: true }) ??
        screen.getByTestId("contact-form")
    );

    // After submit, all values should be cleared
    expect(screen.getByPlaceholderText("name")).toHaveValue("");
    expect(screen.getByPlaceholderText("email")).toHaveValue("");
    expect(screen.getByPlaceholderText("website")).toHaveValue("");
    expect(screen.getByPlaceholderText("message")).toHaveValue("");
  });
});
