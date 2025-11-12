import { render, screen } from '@testing-library/react'
import MealCard from '@/components/FeaturedMeals/MealCard'
import { Food } from '@/types'

const mockFood: Food = {
  id: '1',
  name: 'Test Food',
  rating: 4.5,
  image: 'https://example.com/image.jpg',
  price: '$10.99',
  restaurant: {
    name: 'Test Restaurant',
    logo: 'https://example.com/logo.jpg',
    status: 'Open Now',
  },
}

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

describe('MealCard Component Rendering', () => {
  it('renders food name correctly', () => {
    render(<MealCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
    expect(screen.getByText('Test Food')).toBeInTheDocument()
  })

  it('renders restaurant name correctly', () => {
    render(<MealCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument()
  })

  it('renders food rating correctly', () => {
    render(<MealCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('renders price badge correctly', () => {
    render(<MealCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
    expect(screen.getByText('$10.99')).toBeInTheDocument()
  })

  it('renders restaurant status correctly', () => {
    render(<MealCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
    expect(screen.getByText('Open Now')).toBeInTheDocument()
  })

  it('has correct test ID', () => {
    render(<MealCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
    expect(screen.getByTestId('food-meal-card')).toBeInTheDocument()
  })
})




