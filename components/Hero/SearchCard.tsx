'use client'

import { useState, FormEvent } from 'react'
import DeliveryPickupToggle from './DeliveryPickupToggle'

interface SearchCardProps {
  onSearch: (query: string) => void
}

export default function SearchCard({ onSearch }: SearchCardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="food-search-card w-full max-w-[1000px] bg-white rounded-2xl shadow-food-card p-6">
      <div className="food-search-options mb-6">
        <DeliveryPickupToggle 
          value={deliveryType} 
          onChange={setDeliveryType} 
        />
      </div>
      
      <form onSubmit={handleSubmit} className="food-search-form flex gap-4">
        <div className="food-search-input-wrapper flex-1 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#F17228"/>
            </svg>
          </div>
          <input
            type="text"
            id="food-search"
            name="food-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you like to eat today?"
            className="food-search-input w-full h-[60px] pl-12 pr-4 py-2 rounded-lg bg-food-light-gray border-none outline-none"
          />
        </div>
        <button
          type="submit"
          className="food-find-meal-btn h-[60px] px-12 py-[21px] rounded-lg bg-food-gradient-button text-white font-bold text-lg leading-[100%] whitespace-nowrap"
        >
          Find Meal
        </button>
      </form>
    </div>
  )
}

