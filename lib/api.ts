import axios from 'axios'
import { Food, FoodFormData, FoodApiResponse, ApiError } from '@/types'

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getFoods = async (searchParam?: string): Promise<Food[]> => {
  try {
    // Fetch all foods from the API
    const response = await apiClient.get<FoodApiResponse[]>('/Food')
    
    // Map the response data directly from API
    let foods = response.data.map(item => {
      // Get food image from various possible fields
      const foodImage = item.food_image || item.image || item.avatar || ''
      
      // Get restaurant logo from various possible fields
      const restaurantLogo = item.restaurant_logo || item.logo || ''
      
      // Get restaurant name
      const restaurantName = item.restaurant_name || item.restaurantName || ''
      
      // Get restaurant status - handle both formats and ensure correct type
      let restaurantStatus: 'Open Now' | 'Closed' = 'Closed'
      const statusValue = item.restaurant_status || item.status || 'Closed'
      if (statusValue === 'Open' || statusValue === 'Open Now') {
        restaurantStatus = 'Open Now'
      } else {
        restaurantStatus = 'Closed'
      }
      
      // Build restaurant object
      const restaurant: { name: string; logo: string; status: 'Open Now' | 'Closed' } | undefined = restaurantLogo || restaurantName ? {
        name: restaurantName,
        logo: restaurantLogo,
        status: restaurantStatus
      } : undefined
      
      // Use food_rating if available, otherwise validate and clamp the rating field
      let rating = 0
      if (item.food_rating !== undefined && item.food_rating !== null) {
        const ratingNum = typeof item.food_rating === 'number' ? item.food_rating : parseFloat(String(item.food_rating))
        if (!isNaN(ratingNum)) {
          rating = Math.max(1, Math.min(5, ratingNum))
        }
      } else if (item.rating !== undefined && item.rating !== null) {
        const ratingNum = typeof item.rating === 'number' ? item.rating : parseFloat(String(item.rating))
        if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
          rating = ratingNum
        }
      }
      
      // Get price - handle both Price (capital P) and price
      const price = item.Price || item.price || '$0.00'
      const formattedPrice = price.toString().startsWith('$') ? price : `$${price}`
      
      // Get food name
      const foodName = item.food_name || item.name || ''
      
      return {
        id: item.id || '',
        name: foodName,
        rating: rating,
        image: foodImage,
        restaurant: restaurant,
        price: formattedPrice,
      }
    })
    
    // If there's a search parameter, filter client-side
    if (searchParam && searchParam.trim()) {
      const searchTerm = searchParam.toLowerCase().trim()
      foods = foods.filter(food => 
        food.name.toLowerCase().includes(searchTerm)
      )
    }
    
    return foods
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Provide more detailed error information
      const status = error.response?.status
      const statusText = error.response?.statusText
      const message = error.response?.data?.message || error.message
      
      if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
        throw new Error('Network error: Please check your internet connection')
      }
      
      if (status) {
        throw new Error(`Failed to fetch foods: ${status} ${statusText || message}`)
      }
      
      throw new Error(`Failed to fetch foods: ${message}`)
    }
    throw new Error('An unexpected error occurred while fetching foods')
  }
}

export const createFood = async (data: FoodFormData): Promise<Food> => {
  try {
    const payload = {
      name: data.food_name,
      rating: data.food_rating,
      image: data.food_image,
      restaurant: {
        name: data.restaurant_name,
        logo: data.restaurant_logo,
        status: data.restaurant_status,
      },
    }
    
    const response = await apiClient.post<FoodApiResponse>('/Food', payload)
    
    // Handle restaurant status type
    let restaurantStatus: 'Open Now' | 'Closed' = 'Closed'
    if (response.data.restaurant?.status) {
      restaurantStatus = response.data.restaurant.status === 'Open Now' ? 'Open Now' : 'Closed'
    }
    
    const restaurant = response.data.restaurant ? {
      name: response.data.restaurant.name || '',
      logo: response.data.restaurant.logo || '',
      status: restaurantStatus
    } : undefined
    
    return {
      id: response.data.id || '',
      name: response.data.name || response.data.food_name || '',
      rating: typeof response.data.rating === 'number' ? response.data.rating : (typeof response.data.food_rating === 'number' ? response.data.food_rating : 0),
      image: response.data.image || response.data.food_image || '',
      restaurant: restaurant,
      price: response.data.price || response.data.Price || '$0.00',
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create food')
    }
    throw new Error('An unexpected error occurred')
  }
}

export const updateFood = async (id: string, data: FoodFormData): Promise<Food> => {
  try {
    const payload = {
      name: data.food_name,
      rating: data.food_rating,
      image: data.food_image,
      restaurant: {
        name: data.restaurant_name,
        logo: data.restaurant_logo,
        status: data.restaurant_status,
      },
    }
    
    const response = await apiClient.put<FoodApiResponse>(`/Food/${id}`, payload)
    
    // Handle restaurant status type
    let restaurantStatus: 'Open Now' | 'Closed' = 'Closed'
    if (response.data.restaurant?.status) {
      restaurantStatus = response.data.restaurant.status === 'Open Now' ? 'Open Now' : 'Closed'
    }
    
    const restaurant = response.data.restaurant ? {
      name: response.data.restaurant.name || '',
      logo: response.data.restaurant.logo || '',
      status: restaurantStatus
    } : undefined
    
    return {
      id: response.data.id || '',
      name: response.data.name || response.data.food_name || '',
      rating: typeof response.data.rating === 'number' ? response.data.rating : (typeof response.data.food_rating === 'number' ? response.data.food_rating : 0),
      image: response.data.image || response.data.food_image || '',
      restaurant: restaurant,
      price: response.data.price || response.data.Price || '$0.00',
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update food')
    }
    throw new Error('An unexpected error occurred')
  }
}

export const deleteFood = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/Food/${id}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete food')
    }
    throw new Error('An unexpected error occurred')
  }
}

