import { Button } from "@repo/ui/components";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("Button", () => {
  it("should be rendered", () => {
    render(<Button>Click me!</Button>);

    expect(screen.queryByRole("button")).toBeInTheDocument();
  });

  it("should be clickable", async () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn}>Click me!</Button>);

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
