'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import SearchCard from './SearchCard'

interface HeroProps {
  onSearch: (query: string) => void
}

export default function Hero({ onSearch }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section 
      className="food-hero relative w-full h-[500px] bg-food-secondary flex items-center px-[120px] overflow-hidden pb-12"
      style={{
        animation: isVisible ? 'food-slide-up 0.3s ease-out' : 'none',
        animationFillMode: 'both'
      }}
    >
      <div className="food-hero-content flex flex-col gap-6 z-10 max-w-[1000px]">
        <div className="food-hero-title flex flex-col gap-3">
          <h1 className="text-white text-5xl font-bold leading-tight">
            Are you starving?
          </h1>
          <p className="text-white text-lg">
            Within a few clicks, find meals that are accessible near you.
          </p>
        </div>
        <SearchCard onSearch={onSearch} />
      </div>
      
      <div className="food-hero-image absolute bottom-0 right-[120px] h-[300px] w-auto z-0" style={{filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))'}}>
        <Image
          src="/hero-food.png"
          alt="Food"
          width={450}
          height={450}
          className="h-full w-auto object-contain"
          unoptimized
        />
      </div>
    </section>
  )
}

