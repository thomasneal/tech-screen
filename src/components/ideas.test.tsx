import { render, screen } from '@testing-library/react'
import Ideas from './ideas'

describe('Ideas', () => {
  it('has New Idea button', () => {
    const { container } = render(<Ideas />)

    const button = screen.getByRole('button', {
      name: /New Idea/i,
    })

    expect(button).toBeInTheDocument();
  })
})