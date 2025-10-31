import { render, screen } from '@testing-library/react'
import App from '@/App.jsx'

test('renders the hello message', () => {
  render(<App />)
  expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument()
})

