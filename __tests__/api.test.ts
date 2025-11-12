import { getFoods, createFood, updateFood, deleteFood } from '@/lib/api'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API Service - Data Fetching', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('successfully fetches foods from API', async () => {
    const mockFoods = [
      {
        id: '1',
        name: 'Test Food',
        rating: 4.5,
        image: 'https://example.com/image.jpg',
        restaurant: {
          name: 'Test Restaurant',
          logo: 'https://example.com/logo.jpg',
          status: 'Open Now',
        },
      },
    ]

    mockedAxios.create = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ data: mockFoods }),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    })) as any

    const foods = await getFoods()
    
    expect(foods).toHaveLength(1)
    expect(foods[0].name).toBe('Test Food')
    expect(foods[0].rating).toBe(4.5)
  })

  it('handles API error when fetching foods', async () => {
    mockedAxios.create = jest.fn(() => ({
      get: jest.fn().mockRejectedValue(new Error('Network Error')),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    })) as any

    await expect(getFoods()).rejects.toThrow('Failed to fetch foods')
  })

  it('successfully creates a new food', async () => {
    const mockFoodData = {
      food_name: 'New Food',
      food_rating: 4.5,
      food_image: 'https://example.com/image.jpg',
      restaurant_name: 'New Restaurant',
      restaurant_logo: 'https://example.com/logo.jpg',
      restaurant_status: 'Open Now' as const,
    }

    const mockResponse = {
      id: '1',
      name: 'New Food',
      rating: 4.5,
      image: 'https://example.com/image.jpg',
      restaurant: {
        name: 'New Restaurant',
        logo: 'https://example.com/logo.jpg',
        status: 'Open Now',
      },
    }

    mockedAxios.create = jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn().mockResolvedValue({ data: mockResponse }),
      put: jest.fn(),
      delete: jest.fn(),
    })) as any

    const result = await createFood(mockFoodData)
    
    expect(result.name).toBe('New Food')
    expect(result.restaurant?.name).toBe('New Restaurant')
  })

  it('handles search parameter correctly', async () => {
    const mockFoods = [
      {
        id: '1',
        name: 'Pizza',
        rating: 4.5,
        image: 'https://example.com/image.jpg',
      },
    ]

    mockedAxios.create = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ data: mockFoods }),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    })) as any

    const foods = await getFoods('Pizza')
    
    expect(foods).toHaveLength(1)
    expect(foods[0].name).toBe('Pizza')
  })
})




