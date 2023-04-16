import { render, screen, fireEvent } from '@testing-library/react'
import Ideas from './ideas'

describe('Ideas', () => {
  it('has New Idea button', () => {
    render(<Ideas />)

    const button = screen.getByRole('button', {
      name: /New Idea/i,
    })

    expect(button).toBeInTheDocument();
  })

  it('creating a new Idea adds a new item to Ideas', () => {
   const { container }  = render(<Ideas />)

    const button = screen.getByRole('button', {
      name: /New Idea/i,
    })

    fireEvent.click(button);

    console.log(container);

    expect(button).toBeInTheDocument();
  })
})