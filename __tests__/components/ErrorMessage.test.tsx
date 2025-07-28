import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "@/components/elementary/ErrorMessage";
import { jest } from "@jest/globals";

describe("ErrorMessage", () => {
  it("renders error message with string error", () => {
    render(<ErrorMessage error="Test error message" />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("خطا در بارگذاری")).toBeInTheDocument();
  });

  it("renders error message with object error", () => {
    const error = {
      data: { error: "API error message" },
    };

    render(<ErrorMessage error={error} />);

    expect(screen.getByText("API error message")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const mockRetry = jest.fn();

    render(<ErrorMessage error="Test error" onRetry={mockRetry} />);

    const retryButton = screen.getByText("تلاش مجدد");
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<ErrorMessage error="Test error" />);

    expect(screen.queryByText("تلاش مجدد")).not.toBeInTheDocument();
  });

  it("handles error with message property", () => {
    const error = { message: "Error message from message property" };

    render(<ErrorMessage error={error} />);

    expect(
      screen.getByText("Error message from message property")
    ).toBeInTheDocument();
  });

  it("shows default message for unknown error format", () => {
    const error = { someProperty: "value" };

    render(<ErrorMessage error={error} />);

    expect(screen.getByText("خطای غیرمنتظره رخ داده است")).toBeInTheDocument();
  });
});
