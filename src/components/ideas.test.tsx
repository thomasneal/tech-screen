import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ideas from "./ideas";

describe("Ideas", () => {
  it("has New Idea button", () => {
    render(<Ideas />);

    const button = screen.getByRole("button", {
      name: /New Idea/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("creating a new Idea adds a new item to Ideas", () => {
    const { container } = render(<Ideas />);

    const button = screen.getByRole("button", {
      name: /New Idea/i,
    });

    fireEvent.click(button); // use userEvent

    // console.log(container);

    expect(button).toBeInTheDocument();
  });

  it.only("should delete an idea", async () => {
    // 1 - render the ideas
    const user = userEvent.setup();
    render(<Ideas />);

    const button = screen.getByRole("button", {
      name: /New Idea/i,
    });

    expect(
      screen.queryByRole("button", {
        name: /Delete/i,
      })
    ).not.toBeInTheDocument();

    await user.click(button);

    const deleteButton = screen.getByRole("button", {
      name: /Delete/i,
    });

    // 3 - expect there should be one idea
    expect(deleteButton).toBeInTheDocument();

    // 3 - I'm going delete the one
    await user.click(deleteButton);

    // 4 - expect there are no more ideas
    expect(
      screen.queryByRole("button", {
        name: /Delete/i,
      })
    ).not.toBeInTheDocument();
  });
});
