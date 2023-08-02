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
              firstName: res.data[i].firstName,
              lastName: res.data[i].lastName,
              email: res.data[i].email,
              city: res.data[i].city,
              province: res.data[i].province,
              postalCode: res.data[i].postalCode,
              addressDetail: res.data[i].addressDetail,
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
                        width={120}
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
                      <h1 style={{ fontWeight: 'bold', marginBottom: 5 }}>
                        Rp{value.cloth.price * value.quantity},00
                      </h1>
                      {/* The button to open modal */}
                      <label
                        htmlFor={'modal' + value.paymentId.toString()}
                        className="btn"
                        style={{ color: 'white' }}
                      >
                        Detail
                      </label>
                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={'modal' + value.paymentId.toString()}
                        className="modal-toggle"
                      />
                      <div className="modal" style={{ color: 'white' }}>
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            Transaction {value.paymentId + 1937268054}
                          </h3>
                          <div className="py-5" id="modalBody">
                            <div className="flex flex-row gap-2">
                              <div>
                                <Image
                                  src={value.cloth.image}
                                  alt={value.cloth.name}
                                  height={100}
                                  width={120}
                                  loading="lazy"
                                />
                              </div>
                              <div
                                className="flex flex-col gap-2 px-2 py-2"
                                style={{
                                  backgroundColor: 'white',
                                  borderWidth: 1,
                                  borderRadius: 15,
                                  color: 'black',
                                  minWidth: '70%',
                                }}
                              >
                                <label
                                  style={{ fontWeight: 'bold' }}
                                  htmlFor="productDetail"
                                >
                                  Product Detail
                                </label>
                                <div id="productDetail">
                                  <h3>
                                    {value.cloth.name} #{value.cloth.id}{' '}
                                    {value.size}
                                  </h3>
                                  {value.quantity == 1 ? (
                                    <h5 style={{ fontSize: 13 }}>
                                      {value.quantity} item x Rp
                                      {value.cloth.price},00
                                    </h5>
                                  ) : (
                                    <h5>
                                      {value.quantity} items x Rp
                                      {value.cloth.price},00
                                    </h5>
                                  )}
                                </div>
                                <label style={{ fontWeight: 'bold' }}>
                                  Delivery Information
                                </label>
                                <div id="deliveryInformation">
                                  <h3>Courier: JNE</h3>
                                  <h3>
                                    Receiver Name:{' '}
                                    {value.firstName + ' ' + value.lastName}
                                  </h3>
                                  <h3>Receiver Email: {value.email}</h3>
                                  <h3>City: {value.city}</h3>
                                  <h3>Province: {value.province}</h3>
                                  <h3>Postal Code: {value.postalCode}</h3>
                                  <h3>Address Detail: {value.addressDetail}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-action">
                            <label
                              htmlFor={'modal' + value.paymentId.toString()}
                              className="btn"
                              style={{ color: 'white' }}
                            >
                              Close
                            </label>
                          </div>
                        </div>
                      </div>
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
