'use client'

import { useState, FormEvent, useEffect } from 'react'
import { updateFood } from '@/lib/api'
import { Food, FoodFormData } from '@/types'

interface EditMealModalProps {
  food: Food
  onClose: () => void
  onSuccess: () => void
}

export default function EditMealModal({ food, onClose, onSuccess }: EditMealModalProps) {
  const [formData, setFormData] = useState<FoodFormData>({
    food_name: food.name,
    food_rating: food.rating,
    food_image: food.image,
    restaurant_name: food.restaurant?.name || '',
    restaurant_logo: food.restaurant?.logo || '',
    restaurant_status: food.restaurant?.status || 'Open Now',
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.food_name.trim()) {
      newErrors.food_name = 'Food Name is required'
    }

    if (!formData.food_rating || formData.food_rating < 1 || formData.food_rating > 5) {
      newErrors.food_rating = 'Food Rating must be a number between 1 and 5'
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = 'Food Image URL is required'
    } else {
      try {
        new URL(formData.food_image)
      } catch {
        newErrors.food_image = 'Food Image URL is required'
      }
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = 'Restaurant Name is required'
    }

    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = 'Restaurant Logo URL is required'
    } else {
      try {
        new URL(formData.restaurant_logo)
      } catch {
        newErrors.restaurant_logo = 'Restaurant Logo URL is required'
      }
    }

    if (formData.restaurant_status !== 'Open Now' && formData.restaurant_status !== 'Closed') {
      newErrors.restaurant_status = 'Restaurant Status must be \'Open Now\' or \'Closed\''
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await updateFood(food.id, formData)
      onSuccess()
    } catch (error) {
      console.error('Failed to update meal:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'food_rating' ? parseFloat(value) || 0 : value,
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="food-modal bg-white rounded-[24px] p-6 w-full max-w-[600px] max-h-[90vh] overflow-y-auto mx-auto">
        <h2 className="text-2xl font-bold leading-[100%] mb-4 text-center" style={{color: '#FF9A0E'}}>Edit Meal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex justify-center">
            <input
              type="text"
              name="food_name"
              value={formData.food_name}
              onChange={handleChange}
              placeholder="Enter food name"
              className="food-input w-full max-w-[500px] h-[45px] px-3 py-1.5 rounded-lg bg-food-light-gray border-none outline-none text-sm"
            />
            {errors.food_name && (
              <p id="food-name-error" className="text-red-500 text-xs mt-0.5 text-center">{errors.food_name}</p>
            )}
          </div>

          <div className="flex justify-center">
            <input
              type="number"
              name="food_rating"
              value={formData.food_rating || ''}
              onChange={handleChange}
              placeholder="Enter food rating"
              min="1"
              max="5"
              step="0.1"
              className="food-input w-full max-w-[500px] h-[45px] px-3 py-1.5 rounded-lg bg-food-light-gray border-none outline-none text-sm"
            />
            {errors.food_rating && (
              <p id="food-rating-error" className="text-red-500 text-xs mt-0.5 text-center">{errors.food_rating}</p>
            )}
          </div>

          <div className="flex justify-center">
            <input
              type="url"
              name="food_image"
              value={formData.food_image}
              onChange={handleChange}
              placeholder="Enter food image URL"
              className="food-input w-full max-w-[500px] h-[45px] px-3 py-1.5 rounded-lg bg-food-light-gray border-none outline-none text-sm"
            />
            {errors.food_image && (
              <p id="food-image-error" className="text-red-500 text-xs mt-0.5 text-center">{errors.food_image}</p>
            )}
          </div>

          <div className="flex justify-center">
            <input
              type="text"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              className="food-input w-full max-w-[500px] h-[45px] px-3 py-1.5 rounded-lg bg-food-light-gray border-none outline-none text-sm"
            />
            {errors.restaurant_name && (
              <p id="restaurant-name-error" className="text-red-500 text-xs mt-0.5 text-center">{errors.restaurant_name}</p>
            )}
          </div>

          <div className="flex justify-center">
            <input
              type="url"
              name="restaurant_logo"
              value={formData.restaurant_logo}
              onChange={handleChange}
              placeholder="Enter restaurant logo URL"
              className="food-input w-full max-w-[500px] h-[45px] px-3 py-1.5 rounded-lg bg-food-light-gray border-none outline-none text-sm"
            />
            {errors.restaurant_logo && (
              <p id="restaurant-logo-error" className="text-red-500 text-xs mt-0.5 text-center">{errors.restaurant_logo}</p>
            )}
          </div>

          <div className="flex justify-center">
            <select
              name="restaurant_status"
              value={formData.restaurant_status}
              onChange={handleChange}
              className="food-input w-full max-w-[500px] h-[45px] px-3 py-1.5 rounded-lg bg-food-light-gray border-none outline-none text-sm"
            >
              <option value="Open Now">Open Now</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.restaurant_status && (
              <p id="restaurant-status-error" className="text-red-500 text-xs mt-0.5 text-center">{errors.restaurant_status}</p>
            )}
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="submit"
              data-test-id="food-edit-submit-btn"
              disabled={isLoading}
              className="food-edit-submit-btn w-[150px] h-[45px] px-6 py-2 rounded-[14px] text-white font-bold text-sm leading-[100%] shadow-food-button disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)'
              }}
            >
              {isLoading ? 'Updating Food...' : 'Save'}
            </button>
            <button
              type="button"
              data-test-id="food-edit-cancel-btn"
              onClick={onClose}
              disabled={isLoading}
              className="food-edit-cancel-btn w-[150px] h-[45px] px-6 py-2 rounded-[14px] border border-[#FFBA26] bg-white text-black font-bold text-sm leading-[100%] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

