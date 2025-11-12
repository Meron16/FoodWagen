'use client'

import { useState } from 'react'
import { deleteFood } from '@/lib/api'
import { Food } from '@/types'

interface DeleteMealModalProps {
  food: Food
  onClose: () => void
  onSuccess: () => void
}

export default function DeleteMealModal({ food, onClose, onSuccess }: DeleteMealModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteFood(food.id)
      onSuccess()
    } catch (error) {
      console.error('Failed to delete meal:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="food-modal bg-white rounded-[24px] p-10 w-full max-w-[500px] mx-auto">
        <h2 className="text-[40px] font-bold leading-[100%] mb-6" style={{color: '#FF9A0E'}}>Delete Meal</h2>
        <p className="text-gray-600 mb-8">
          Are you sure you want to delete this meal? Actions cannot be reversed.
        </p>
        <div className="flex gap-4">
          <button
            data-test-id="food-delete-confirm-btn"
            onClick={handleDelete}
            disabled={isLoading}
            className="food-delete-confirm-btn flex-1 h-[60px] px-12 py-[21px] rounded-[14px] text-white font-bold text-lg leading-[100%] shadow-food-button disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)'
            }}
          >
            {isLoading ? 'Deleting...' : 'Yes'}
          </button>
          <button
            data-test-id="food-delete-cancel-btn"
            onClick={onClose}
            disabled={isLoading}
            className="food-delete-cancel-btn flex-1 h-[60px] px-12 py-[21px] rounded-[14px] border border-[#FFBA26] bg-white text-black font-bold text-lg leading-[100%] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

