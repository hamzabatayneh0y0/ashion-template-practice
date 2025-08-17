import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Shop from "./page"; // أو المسار الصحيح للـ Shop

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => {
    const fn = (key: string) => key;
    fn.has = (key: string) => true;
    return fn;
  },
}));

// Mock next/navigation
const mockPush = jest.fn();
const mockGet = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

// Mock child components
jest.mock("./fetchproducts", () => ({
  __esModule: true,
  default: ({ cat, price }: { cat: string; price: number }) => (
    <div data-testid="products">{`Products cat:${cat} price:${price}`}</div>
  ),
}));
jest.mock("@/components/mycomponents/title/title", () => ({
  __esModule: true,
  default: () => <div data-testid="title">Title Component</div>,
}));
jest.mock("@/components/ui/slider", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Slider: ({ onValueChange }: any) => (
    <input
      data-testid="slider"
      type="range"
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
    />
  ),
}));
jest.mock("@/components/mycomponents/currency/money", () => ({
  __esModule: true,
  default: ({ m }: { m: number }) => <span>{m}</span>,
}));

describe("Shop Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders categories, price slider and products", () => {
    mockGet.mockImplementation((key: string) => {
      if (key === "cat") return "all";
      if (key === "price") return "50";
      return null;
    });
    render(<Shop />);

    // تحقق من Title
    expect(screen.getByTestId("title")).toBeInTheDocument();

    // تحقق من المنتجات
    expect(screen.getByTestId("products")).toHaveTextContent(
      "Products cat:all price:50"
    );

    // تحقق من Slider
    const slider = screen.getByTestId("slider") as HTMLInputElement;
    expect(slider).toBeInTheDocument();
  });

  it("changes category and price", () => {
    mockGet.mockImplementation((key: string) => {
      if (key === "cat") return "all";
      if (key === "price") return "80";
      return null;
    });
    render(<Shop />);

    // غيّر السعر عبر الـ slider
    const slider = screen.getByTestId("slider") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: 80 } });

    // تحقق ان Products استقبلت السعر الجديد
    expect(screen.getByTestId("products")).toHaveTextContent(
      "Products cat:all price:80"
    );

    // تحقق من push على Router
    expect(mockPush).toHaveBeenCalledWith("/shop/?cat=all&price=80");
  });
});
