'use client'

import { useState, useEffect } from 'react'
import { getFoods } from '@/lib/api'
import { Food } from '@/types'
import MealCard from './MealCard'
import EditMealModal from '../Modals/EditMealModal'
import DeleteMealModal from '../Modals/DeleteMealModal'

interface FeaturedMealsProps {
  searchQuery?: string
  onRefresh?: () => void
}

export default function FeaturedMeals({ searchQuery, onRefresh }: FeaturedMealsProps) {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(8)
  const [editingFood, setEditingFood] = useState<Food | null>(null)
  const [deletingFood, setDeletingFood] = useState<Food | null>(null)

  const fetchFoods = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getFoods(searchQuery)
      setFoods(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load foods')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoods()
    // Reset display count when search query changes
    setDisplayCount(8)
  }, [searchQuery])

  const handleLoadMore = () => {
    setDisplayCount(prev => {
      const newCount = prev + 8
      // Don't exceed the total number of foods
      return Math.min(newCount, foods.length)
    })
  }

  const handleEdit = (food: Food) => {
    setEditingFood(food)
  }

  const handleDelete = (food: Food) => {
    setDeletingFood(food)
  }

  const handleEditSuccess = () => {
    setEditingFood(null)
    fetchFoods()
    if (onRefresh) onRefresh()
  }

  const handleDeleteSuccess = () => {
    setDeletingFood(null)
    fetchFoods()
    if (onRefresh) onRefresh()
  }

  const displayedFoods = foods.slice(0, displayCount)
  const hasMore = foods.length > displayCount

  if (loading) {
    return (
      <section className="food-featured-meals w-full px-[120px] pt-12">
        <h2 className="food-section-title text-4xl font-bold text-food-dark text-center mb-12">Featured Meals</h2>
        <div className="flex justify-center items-center py-20">
          <div className="food-loading-spinner">Loading...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="food-featured-meals w-full px-[120px] pt-12">
        <h2 className="food-section-title text-4xl font-bold text-food-dark text-center mb-12">Featured Meals</h2>
        <div className="flex justify-center items-center py-20">
          <p className="food-error-message text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  if (foods.length === 0) {
    return (
      <section className="food-featured-meals w-full px-[120px] pt-12">
        <h2 className="food-section-title text-4xl font-bold text-food-dark text-center mb-12">Featured Meals</h2>
        <div className="flex justify-center items-center py-20">
          <div className="empty-state-message text-gray-500 text-xl">No items available</div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="food-featured-meals w-full px-[120px] pt-12">
        <h2 className="food-section-title text-4xl font-bold text-food-dark text-center mb-12">Featured Meals</h2>
        
        <div className="food-meals-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayedFoods.map((food, index) => (
            <div
              key={food.id}
              className="food-meal-wrapper"
              style={{
                animation: `food-slide-up 0.3s ease-out ${index * 0.1}s both`
              }}
            >
              <MealCard
                food={food}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>

        {displayedFoods.length > 0 && (
          <div className="flex justify-center items-center mt-16 mb-8 w-full" style={{ position: 'relative', zIndex: 100 }}>
            <button
              onClick={hasMore ? handleLoadMore : undefined}
              type="button"
              className="food-learn-more-btn px-12 py-[21px] rounded-[14px] text-white font-bold text-lg leading-[100%] hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{
                background: 'linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)',
                boxShadow: '0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042',
                position: 'relative',
                zIndex: 100,
                pointerEvents: 'auto',
                filter: 'none',
                opacity: 1,
                cursor: 'pointer',
                display: 'block',
                visibility: 'visible'
              }}
            >
              Learn More &gt;
            </button>
          </div>
        )}
      </section>

      {editingFood && (
        <EditMealModal
          food={editingFood}
          onClose={() => setEditingFood(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {deletingFood && (
        <DeleteMealModal
          food={deletingFood}
          onClose={() => setDeletingFood(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </>
  )
}

