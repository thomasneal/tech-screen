import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import localStorageMock from '../__mocks__/localStorage';
import Ideas from './ideas'

describe('Ideas', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

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

  
  it('should set and get items to localStorage', async () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
    Object.setPrototypeOf(window.localStorage.getItem, jest.fn());
    const user = userEvent.setup();
    jest.clearAllMocks();

    render(<Ideas />);

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);

    const newButton = screen.getByRole('button', {
      name: /New Idea/i,
    })

    await user.click(newButton);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  })

  it('should get Ideas from localStorage', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    const initIdeas = [{"id":"f624de8e-431d-4382-9d0d-a12298ad46f4","title":"Alpha","description":"descriptionddddd","lastUpdated":"Mon Apr 10 2023 20:05:09 GMT-0500 (Central Daylight Time)"},{"id":"839a803b-2b7b-4bd1-af9d-e4487d4ac016","title":"Farengi","description":"description","lastUpdated":"Thu Apr 13 2023 14:49:40 GMT-0500 (Central Daylight Time)"}];

  
    await waitFor(() => {
      localStorage.setItem("ideas", JSON.stringify(initIdeas));
    }, { timeout: 500 });

     render(<Ideas />)

    await waitFor(() => {
      const stringToParse = localStorage.getItem("ideas");
      if (stringToParse) {
        const itemsArray = JSON.parse(stringToParse);
        expect(itemsArray).toStrictEqual(initIdeas);
      }
      
    }, { timeout: 1000 });

  })

  it('should update an Idea', async () => {
    const user = userEvent.setup();
    render(<Ideas />)

    const newButton = screen.getByRole('button', {
      name: /New Idea/i,
    })

    await user.click(newButton);

    const inputEditing = screen.getByRole('textbox');

    await act( async () => {
      await userEvent.type(inputEditing, 'A Cool Title');
    });

    fireEvent.blur(inputEditing);

    const headingToEdit = screen.getByText('A Cool Title');
    expect(headingToEdit).toBeInTheDocument();
  })

  it('should sort an Idea', async () => {
    const user = userEvent.setup();
    render(<Ideas />);
    
    expect((screen.getByText('Alphabetically') as HTMLOptionElement).selected).toBeFalsy();

    await user.selectOptions(screen.getByRole("combobox"), 'Alphabetically');

    expect((screen.getByText('Alphabetically') as HTMLOptionElement).selected).toBeTruthy();

    await user.selectOptions(screen.getByRole("combobox"), 'Last Updated');

    expect((screen.getByText('Last Updated') as HTMLOptionElement).selected).toBeTruthy();

  })
})

