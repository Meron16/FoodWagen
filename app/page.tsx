'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import FeaturedMeals from '@/components/FeaturedMeals/FeaturedMeals'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleRefresh = () => {
    setRefreshKey((prev: number) => prev + 1)
  }

  return (
    <main className="food-main min-h-screen flex flex-col">
      <Header />
      <Hero onSearch={handleSearch} />
      <div key={refreshKey}>
        <FeaturedMeals 
          searchQuery={searchQuery} 
          onRefresh={handleRefresh}
        />
      </div>
      <Footer />
    </main>
  )
}
