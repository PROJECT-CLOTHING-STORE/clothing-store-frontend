import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ClothesInterface } from './interface'
import { useSession } from 'next-auth/react'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const ClothesModule: React.FC = () => {
  // TODO: Write module's logic
  const { data: session } = useSession()

  const [pictures, setPictures] = useState<ClothesInterface[]>()
  useEffect(() => {
    axios
      .get(
        'https://clothing-store-backend-production.up.railway.app/clothes/all'
      )
      .then((res) => {
        setPictures(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <main>
        <div className="flex flex-wrap gap-5 py-5 px-5 justify-center">
          {pictures?.map((val, index) => (
            <div
              className="card w-96 bg-base-100 shadow-xl"
              style={{ color: 'white' }}
              key={index}
            >
              <figure>
                <img src={val.image} alt={val.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {val.name}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{val.description}</p>
                <div className="card-actions justify-between items-center">
                  <div className="flex">
                    {val.tags.map((data, indexData) => (
                      <div key={indexData} className="badge badge-outline">
                        {data}
                      </div>
                    ))}
                  </div>
                  {session && <button className="btn btn-outline">buy</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
