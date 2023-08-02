import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { TransactionInterface } from './interface'
import Image from 'next/image'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const TransactionListModule: React.FC = () => {
  // TODO: Write module's logic
  const { data: session } = useSession()
  const [transaction, setTransaction] = useState<TransactionInterface[]>([])
  useEffect(() => {
    if (session) {
      axios
        .get(
          'https://clothing-store-backend-production.up.railway.app/payment/all-by-username',
          {
            data: {
              username: session?.user.username,
            },
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        )
        .then((res) => {
          const finalData = []
          for (let i = 0; i < res.data.length; i++) {
            const data: TransactionInterface = {
              paymentId: res.data[i].id,
              createdAt: new Date(res.data[i].createdAt),
              quantity: res.data[i].quantity,
              size: res.data[i].size,
              isPaid: res.data[i].isPaid,
              cloth: {
                id: res.data[i].cloth.id,
                image: res.data[i].cloth.image,
                name: res.data[i].cloth.name,
                price: res.data[i].cloth.price,
              },
            }
            finalData.push(data)
          }
          setTransaction(finalData)
        })
    }
  }, [session])
  return (
    <>
      {/* <HeroSection></HeroSection> */}
      <main>
        <br></br>
        {transaction.length != 0 ? (
          transaction.map((value) => {
            return (
              <>
                <div
                  className="flex flex-col px-5 py-5 mx-5 my-5 gap-5"
                  style={{
                    borderBlockStyle: 'solid',
                    borderRadius: 25,
                    borderWidth: 2,
                  }}
                >
                  <div className="flex flex-row gap-5 items-center">
                    <Image
                      src={'/assets/images/bag.png'}
                      alt="bag"
                      width={25}
                      height={25}
                      loading="lazy"
                    />

                    <h1>{value.createdAt.toDateString()}</h1>
                    {value.isPaid ? (
                      <div className="badge badge-primary">paid</div>
                    ) : (
                      <div className="badge badge-secondary">not paid</div>
                    )}
                    <h1>{value.paymentId + 1937268054}</h1>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <div className="flex flex-row gap-2">
                      <Image
                        src={value.cloth.image}
                        alt={value.cloth.name}
                        height={100}
                        width={100}
                        loading="lazy"
                      />
                      <div className="flex flex-col gap-1">
                        <h1 style={{ fontWeight: 'bold' }}>
                          {value.cloth.name} #{value.cloth.id} {value.size}
                        </h1>
                        {value.quantity == 1 ? (
                          <h1>
                            {value.quantity} item x Rp{value.cloth.price},00
                          </h1>
                        ) : (
                          <h1>
                            {value.quantity} items x Rp{value.cloth.price},00
                          </h1>
                        )}
                      </div>
                    </div>
                    <div id="flex flex-col gap-1 items-start">
                      <h1>Transaction Total</h1>
                      <h1 style={{ fontWeight: 'bold' }}>
                        Rp{value.cloth.price * value.quantity},00
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        ) : (
          <>
            <h1>No Transaction</h1>
          </>
        )}
        <br></br>
      </main>
      {/* <FAQSection></FAQSection> */}
    </>
  )
}
