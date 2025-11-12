'use client'

import { useEffect, useRef } from 'react'

interface MealCardMenuProps {
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export default function MealCardMenu({ onEdit, onDelete, onClose }: MealCardMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="food-menu-dropdown absolute top-4 right-0 w-[84px] bg-white rounded-[5px] border border-gray-200 shadow-lg py-1 px-3 z-50"
    >
      <button
        data-test-id="food-edit-btn"
        onClick={onEdit}
        className="food-edit-btn w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100"
      >
        Edit
      </button>
      <button
        data-test-id="food-delete-btn"
        onClick={onDelete}
        className="food-delete-btn w-full text-left py-1 text-sm text-red-600 hover:bg-gray-100"
      >
        Delete
      </button>
    </div>
  )
}




