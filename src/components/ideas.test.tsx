import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Ideas from './ideas'

describe('Ideas', () => {
  it('has New Idea button', () => {
    render(<Ideas />)

    const button = screen.getByRole('button', {
      name: /New Idea/i,
    })

    expect(button).toBeInTheDocument();
  })

  it('should delete an Idea', async () => {
    const user = userEvent.setup();
    render(<Ideas />)

    const newButton = screen.getByRole('button', {
      name: /New Idea/i,
    })

    expect(
      screen.queryByRole("button", {
        name: /Delete/i,
      })
    ).not.toBeInTheDocument();

    await user.click(newButton);

    const deleteButton = screen.getByRole("button", {
      name: /Delete/i,
    });

    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    expect(
      screen.queryByRole("button", {
        name: /Delete/i,
      })
    ).not.toBeInTheDocument();
  })
})