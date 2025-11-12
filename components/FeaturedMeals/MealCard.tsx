'use client'

import { useState } from 'react'
import { Food } from '@/types'
import MealCardMenu from './MealCardMenu'

interface MealCardProps {
  food: Food
  onEdit: (food: Food) => void
  onDelete: (food: Food) => void
}

export default function MealCard({ food, onEdit, onDelete }: MealCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const price = food.price || '$0.00'
  const restaurantStatus = food.restaurant?.status || 'Closed'
  const isOpen = restaurantStatus === 'Open Now'
  const foodName = food.name || 'Unnamed Food'
  
  // Validate image URLs - must be a non-empty string and a valid URL
  const isValidUrl = (url: string | undefined): boolean => {
    if (!url || typeof url !== 'string' || url.trim() === '') return false
    try {
      new URL(url)
      return true
    } catch {
      // Also allow relative URLs or data URLs
      return url.startsWith('http') || url.startsWith('https') || url.startsWith('data:') || url.startsWith('/')
    }
  }
  
  const foodImage = isValidUrl(food.image) ? food.image : ''
  const restaurantLogo = isValidUrl(food.restaurant?.logo) ? food.restaurant.logo : ''
  
  // Clamp rating between 1 and 5
  const getValidRating = (rating: number | string | undefined): number => {
    if (typeof rating === 'number') {
      return Math.max(1, Math.min(5, rating))
    }
    if (typeof rating === 'string') {
      const parsed = parseFloat(rating)
      if (!isNaN(parsed)) {
        return Math.max(1, Math.min(5, parsed))
      }
    }
    return 0
  }
  
  const validRating = getValidRating(food.rating)

  return (
    <div 
      data-test-id="food-meal-card"
      className="food-card group relative w-full max-w-[300px] rounded-2xl overflow-hidden transition-transform duration-150 ease-out hover:scale-105"
    >
      <div className="food-card-image-wrapper relative w-full rounded-2xl bg-white overflow-hidden" style={{aspectRatio: '1.2/1', height: 'auto'}}>
        {foodImage && !imageError ? (
          <img
            src={foodImage}
            alt={foodName}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        <div className="food-price-badge absolute top-6 left-6 px-4 py-2 rounded-lg bg-food-primary flex items-center gap-2">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8.89453V1.6875C0 0.773438 0.738281 0 1.6875 0H8.85938C9.31641 0 9.73828 0.210938 10.0547 0.527344L17.4727 7.94531C18.1406 8.61328 18.1406 9.70312 17.4727 10.3359L10.3008 17.5078C9.66797 18.1758 8.57812 18.1758 7.91016 17.5078L0.492188 10.0898C0.175781 9.77344 0 9.35156 0 8.89453ZM3.9375 2.25C2.98828 2.25 2.25 3.02344 2.25 3.9375C2.25 4.88672 2.98828 5.625 3.9375 5.625C4.85156 5.625 5.625 4.88672 5.625 3.9375C5.625 3.02344 4.85156 2.25 3.9375 2.25Z" fill="white"/>
          </svg>
          <span className="food-price text-white font-bold text-xl leading-[120%]">
            {price}
          </span>
        </div>
      </div>

      <div className="food-card-content mt-7 flex flex-col gap-2">
        <div className="flex items-start gap-4">
          {restaurantLogo && !logoError ? (
            <div className="restaurant-logo w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
              <img
                src={restaurantLogo}
                alt="Restaurant Logo"
                className="w-full h-full object-cover"
                onError={() => setLogoError(true)}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="restaurant-logo w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Logo</span>
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <div className="food-name text-[#424242] font-bold text-base leading-[120%]">
              {foodName}
            </div>
            {validRating > 0 && (
              <div className="flex items-center gap-1">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6562 1.03125C11.1719 0 12.6328 0.0429688 13.1055 1.03125L15.9414 6.74609L22.2148 7.64844C23.332 7.82031 23.7617 9.19531 22.9453 10.0117L18.4336 14.4375L19.5078 20.668C19.6797 21.7852 18.4766 22.6445 17.4883 22.1289L11.9023 19.1641L6.27344 22.1289C5.28516 22.6445 4.08203 21.7852 4.25391 20.668L5.32812 14.4375L0.816406 10.0117C0 9.19531 0.429688 7.82031 1.54688 7.64844L7.86328 6.74609L10.6562 1.03125Z" fill="#FFB30E"/>
                </svg>
                <span className="food-rating text-food-secondary text-xl leading-[120%]">
                  {validRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="food-menu-btn p-2 hover:bg-gray-100 rounded"
              aria-label="Menu options"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="5" r="2" fill="#424242"/>
                <circle cx="12" cy="12" r="2" fill="#424242"/>
                <circle cx="12" cy="19" r="2" fill="#424242"/>
              </svg>
            </button>
            {showMenu && (
              <MealCardMenu
                onEdit={() => {
                  setShowMenu(false)
                  onEdit(food)
                }}
                onDelete={() => {
                  setShowMenu(false)
                  onDelete(food)
                }}
                onClose={() => setShowMenu(false)}
              />
            )}
          </div>
        </div>

        <button
          className={`restaurant-status w-[97px] px-4 py-2 rounded-2xl font-bold text-sm leading-[120%] ${
            isOpen
              ? 'bg-[#79B93C33] text-green-600'
              : 'bg-[#F1722833] text-food-primary'
          }`}
        >
          {restaurantStatus}
        </button>
      </div>
    </div>
  )
}

