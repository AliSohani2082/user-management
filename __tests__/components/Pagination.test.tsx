import Pagination from "@/components/elementary/Pagination";
import enMessages from "@/messages/en.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Pagination", () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("disables previous button on first page", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      </NextIntlClientProvider>
    );

    const prevButton = screen.getByTestId("pagination-prev");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      </NextIntlClientProvider>
    );

    const nextButton = screen.getByTestId("pagination-next");
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when previous button is clicked", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      </NextIntlClientProvider>
    );

    const prevButton = screen.getByTestId("pagination-prev");
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when next button is clicked", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      </NextIntlClientProvider>
    );

    const nextButton = screen.getByTestId("pagination-next");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("does not render when totalPages is 1 or less", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      </NextIntlClientProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it("shows ellipsis for large page ranges", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Pagination
          currentPage={10}
          totalPages={20}
          onPageChange={mockOnPageChange}
        />
      </NextIntlClientProvider>
    );

    const ellipsisElements = screen.getAllByText("...");
    expect(ellipsisElements.length).toBe(2);
  });
});
