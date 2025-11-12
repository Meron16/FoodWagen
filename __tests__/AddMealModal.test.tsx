import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddMealModal from '@/components/Modals/AddMealModal'
import { createFood } from '@/lib/api'

jest.mock('@/lib/api')

const mockOnClose = jest.fn()
const mockOnSuccess = jest.fn()

describe('AddMealModal User Interaction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls onClose when cancel button is clicked', () => {
    render(<AddMealModal onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const cancelButton = screen.getByTestId('food-add-cancel-btn')
    fireEvent.click(cancelButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('submits form with valid data', async () => {
    const mockCreateFood = createFood as jest.MockedFunction<typeof createFood>
    mockCreateFood.mockResolvedValueOnce({
      id: '1',
      name: 'New Food',
      rating: 4.5,
      image: 'https://example.com/image.jpg',
      restaurant: {
        name: 'New Restaurant',
        logo: 'https://example.com/logo.jpg',
        status: 'Open Now',
      },
    })

    render(<AddMealModal onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const foodNameInput = screen.getByPlaceholderText('Enter food name')
    const foodRatingInput = screen.getByPlaceholderText('Enter food rating')
    const foodImageInput = screen.getByPlaceholderText('Enter food image URL')
    const restaurantNameInput = screen.getByPlaceholderText('Enter restaurant name')
    const restaurantLogoInput = screen.getByPlaceholderText('Enter restaurant logo URL')
    const submitButton = screen.getByTestId('food-add-submit-btn')

    await userEvent.type(foodNameInput, 'New Food')
    await userEvent.type(foodRatingInput, '4.5')
    await userEvent.type(foodImageInput, 'https://example.com/image.jpg')
    await userEvent.type(restaurantNameInput, 'New Restaurant')
    await userEvent.type(restaurantLogoInput, 'https://example.com/logo.jpg')
    
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockCreateFood).toHaveBeenCalledWith({
        food_name: 'New Food',
        food_rating: 4.5,
        food_image: 'https://example.com/image.jpg',
        restaurant_name: 'New Restaurant',
        restaurant_logo: 'https://example.com/logo.jpg',
        restaurant_status: 'Open Now',
      })
    })
  })

  it('shows validation errors for empty required fields', async () => {
    render(<AddMealModal onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const submitButton = screen.getByTestId('food-add-submit-btn')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Food Name is required')).toBeInTheDocument()
    })
  })
})




