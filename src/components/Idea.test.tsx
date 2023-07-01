import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import IdeaCard from './idea';

describe('IdeaCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const user = userEvent.setup();
    const initIdea = {
      id: "3k390dk940",
      title: "Cool Idea",
      description: "This is a very cool description of an idea",
      lastUpdated: "Mon Apr 10 2023 20:05:09 GMT-0500 (Central Daylight Time)"
    }
    const handleUpdate = jest.fn();
    const handleDelete = jest.fn();

  it('should update a description and dismiss notification when clicked', async () => {
    render(
      <IdeaCard idea={initIdea} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    );
    
    const paragraphDesc = screen.getByText('This is a very cool description of an idea');

    await user.click(paragraphDesc);

    const textAreaEditing = screen.getByRole('textbox');

    expect(textAreaEditing).toBeInTheDocument();

    fireEvent.change(textAreaEditing, {target: {value: ''}})

    fireEvent.blur(textAreaEditing);

    const newDescription = screen.getByText('Description');

    expect(newDescription).toBeInTheDocument();

    await user.click(newDescription);

    const editAgain = screen.getByRole('textbox');

    fireEvent.change(editAgain, {target: {value: 'A cool description, bro'}})

    fireEvent.blur(editAgain);

    const updatedDescription = screen.getByText('A cool description, bro');

    expect(updatedDescription).toBeInTheDocument();

    const updateAlert = screen.getByText('Idea updated successfully');

    expect(updateAlert).toBeInTheDocument();

    await user.click(updateAlert);

    expect(updateAlert).not.toBeInTheDocument();
  })

  it('should show input to edit title when title heading clicked', async () => {
    render(
      <IdeaCard idea={initIdea} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    );
    const headingTitle = screen.getByText('Cool Idea');

    await user.click(headingTitle);

    const inputEditing = screen.getByRole('textbox');

    expect(inputEditing).toBeInTheDocument();

    fireEvent.change(inputEditing, {target: {value: 'Cool title, bro'}})
    fireEvent.blur(inputEditing);

    const newTitle = screen.getByText('Cool title, bro');

    expect(newTitle).toBeInTheDocument();

    await user.click(newTitle);

    const editAgain = screen.getByRole('textbox');

    expect(editAgain).toBeInTheDocument();

    fireEvent.change(editAgain, {target: {value: ''}})
    fireEvent.blur(editAgain);

    const updatedTitle = screen.getByText('Title');

    expect(updatedTitle).toBeInTheDocument();
  })
});