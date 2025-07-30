import ErrorMessage from "@/components/elementary/ErrorMessage";
import enMessages from "@/messages/en.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

describe("ErrorMessage", () => {
  it("renders error message with string error", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ErrorMessage error="Test error message" />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("renders error message with object error", () => {
    const error = {
      data: { error: "API error message" },
    };

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ErrorMessage error={error} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("API error message")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const mockRetry = vi.fn();

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ErrorMessage error="Test error" onRetry={mockRetry} />
      </NextIntlClientProvider>
    );

    const retryButton = screen.getByTestId("retry");
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ErrorMessage error="Test error" />
      </NextIntlClientProvider>
    );
    expect(screen.queryByTestId("retry")).not.toBeInTheDocument();
  });

  it("handles error with message property", () => {
    const error = { message: "Error message from message property" };

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ErrorMessage error={error} />
      </NextIntlClientProvider>
    );

    expect(
      screen.getByText("Error message from message property")
    ).toBeInTheDocument();
  });

  it("shows default message for unknown error format", () => {
    const error = { someProperty: "value" };

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ErrorMessage error={error} />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("unknown-error")).toBeInTheDocument();
  });
});
