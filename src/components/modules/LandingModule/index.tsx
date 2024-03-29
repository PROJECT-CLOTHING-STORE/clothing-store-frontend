import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const LandingModule: React.FC = () => {
  const router = useRouter()
  // TODO: Write module's logic
  return (
    <>
      <main>
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src="/assets/images/clothing_3d.jpg"
              className="rounded-full shadow-2xl"
              alt="clothing3d"
              width={500}
              height={700}
              loading="lazy"
            />
            <div>
              <h1 className="text-5xl font-bold">Treat Yourself With Style!</h1>
              <p className="py-6">
                Discover your perfect style with our trendy and fashionable
                clothing collection, designed to elevate your wardrobe and
                express your unique personality.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  router.push('/login')
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
