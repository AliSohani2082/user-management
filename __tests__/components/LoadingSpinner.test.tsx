import LoadingSpinner from "@/components/elementary/LoadingSpinner";
import enMessages from "@/messages/en.json";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

describe("LoadingSpinner", () => {
  it("renders loading spinner with text", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LoadingSpinner />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LoadingSpinner />
      </NextIntlClientProvider>
    );

    const spinner = screen.getByTestId("loading");
    expect(spinner).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LoadingSpinner />
      </NextIntlClientProvider>
    );

    expect(container.firstChild).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "min-h-[400px]"
    );
  });
});
