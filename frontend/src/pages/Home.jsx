import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletterbox from '../components/Newsletterbox'
import Categories from '../components/Categories'
import QuickSearch from '../components/QuickSearch'
import PromoBanner from '../components/PromoBanner'
import Reviews from '../components/Reviews'
import RecentlyViewed from '../components/RecentlyViewed'
import FeaturedProducts from '../components/FeaturedProducts'
import KitPromoBanner from '../components/PromoBanner2'
import PromoBanner3 from '../components/PromoBanner3'

const Home = () => {
  return (
    <div>
      <QuickSearch />
      <Hero/>
      <PromoBanner3 />
      <RecentlyViewed />
      <LatestCollection/>
      <FeaturedProducts />
      <KitPromoBanner/>
      <Categories/>
      <BestSeller/>
      <PromoBanner />
      <Reviews/>
      <OurPolicy/>
      <Newsletterbox/>
    </div>
  )
}

export default Home