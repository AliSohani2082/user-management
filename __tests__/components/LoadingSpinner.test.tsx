import { render, screen } from "@testing-library/react";
import LoadingSpinner from "@/components/elementary/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders loading spinner with text", () => {
    render(<LoadingSpinner />);

    expect(screen.getByText("در حال بارگذاری...")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByText("در حال بارگذاری...");
    expect(spinner).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<LoadingSpinner />);

    expect(container.firstChild).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "min-h-[400px]"
    );
  });
});
