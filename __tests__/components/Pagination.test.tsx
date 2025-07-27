import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";
import { jest } from "@jest/globals";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("renders pagination with correct page numbers", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("قبلی")).toBeInTheDocument();
    expect(screen.getByText("بعدی")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByText("قبلی");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText("بعدی");
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when page number is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByText("4");
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange when previous button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByText("قبلی");
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when next button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText("بعدی");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("does not render when totalPages is 1 or less", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("shows ellipsis for large page ranges", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        onPageChange={mockOnPageChange}
      />
    );

    const ellipsisElements = screen.getAllByText("...");
    expect(ellipsisElements.length).toBe(2);
  });
});
