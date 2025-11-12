export interface Restaurant {
  name: string
  logo: string
  status: 'Open Now' | 'Closed'
}

export interface Food {
  id: string
  name: string
  rating: number
  image: string
  restaurant?: Restaurant
  price?: string
}

export interface FoodFormData {
  food_name: string
  food_rating: number
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: 'Open Now' | 'Closed'
}

export interface FoodApiResponse {
  id: string
  createdAt?: string
  name?: string
  food_name?: string
  avatar?: string
  image?: string
  food_image?: string
  rating?: number | string
  food_rating?: number | string
  open?: boolean
  logo?: string
  restaurant_logo?: string
  Price?: string
  price?: string
  restaurant_name?: string
  restaurantName?: string
  restaurant_status?: string
  status?: string
  restaurant?: Restaurant
}

export interface ApiError {
  message: string
  error?: string
}


