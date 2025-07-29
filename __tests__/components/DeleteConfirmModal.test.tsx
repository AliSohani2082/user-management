import { fireEvent, render, screen } from "@testing-library/react"

import DeleteConfirmModal from "@/components/elementary/DeleteConfirmModal"

describe("DeleteConfirmModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    isLoading: false,
    userName: "John Doe",
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders modal when open", () => {
    render(<DeleteConfirmModal {...defaultProps} />)

    expect(screen.getByText("تأیید حذف کاربر")).toBeInTheDocument()
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
  })

  it("does not render modal when closed", () => {
    render(<DeleteConfirmModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByText("تأیید حذف کاربر")).not.toBeInTheDocument()
  })

  it("calls onConfirm when confirm button is clicked", () => {
    render(<DeleteConfirmModal {...defaultProps} />)

    const confirmButton = screen.getByText("بله، حذف کن")
    fireEvent.click(confirmButton)

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when cancel button is clicked", () => {
    render(<DeleteConfirmModal {...defaultProps} />)

    const cancelButton = screen.getByText("انصراف")
    fireEvent.click(cancelButton)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it("shows loading state when isLoading is true", () => {
    render(<DeleteConfirmModal {...defaultProps} isLoading={true} />)

    expect(screen.getByText("در حال حذف...")).toBeInTheDocument()

    const confirmButton = screen.getByText("در حال حذف...")
    const cancelButton = screen.getByText("انصراف")

    expect(confirmButton).toBeDisabled()
    expect(cancelButton).toBeDisabled()
  })

  it("displays correct user name in confirmation message", () => {
    render(<DeleteConfirmModal {...defaultProps} userName="Jane Smith" />)

    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument()
  })

  it("has correct accessibility attributes", () => {
    render(<DeleteConfirmModal {...defaultProps} />)

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()
  })
})
