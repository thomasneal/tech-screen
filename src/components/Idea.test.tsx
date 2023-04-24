import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import IdeaCard from './idea';

describe('IdeaCard', () => {
  it('should update a description and dismiss notification when clicked', async () => {
    const user = userEvent.setup();
    const initIdea = {
      id: "3k390dk940",
      title: "Cool Idea",
      description: "This is a very cool description of an idea",
      lastUpdated: "Mon Apr 10 2023 20:05:09 GMT-0500 (Central Daylight Time)"
    }
    const handleUpdate = jest.fn();
    const handleDelete = jest.fn();

    render(
      <IdeaCard idea={initIdea} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    );

    const paragraphDesc = screen.getByText('This is a very cool description of an idea');

    await user.click(paragraphDesc);

    const textAreaEditing = screen.getByRole('textbox');

    expect(textAreaEditing).toBeInTheDocument();

    fireEvent.change(textAreaEditing, {target: {value: 'A different, cooler description'}})

    fireEvent.blur(textAreaEditing);

    const newDescription = screen.getByText('A different, cooler description');

    expect(newDescription).toBeInTheDocument();

    const updateAlert = screen.getByText('Idea updated successfully');

    expect(updateAlert).toBeInTheDocument();

    await user.click(updateAlert);

    expect(updateAlert).not.toBeInTheDocument();
  })
});