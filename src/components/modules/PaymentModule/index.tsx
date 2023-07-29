import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ClothesPaymentInterface } from './interface'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const PaymentModule: React.FC<{ id: any }> = ({ id }) => {
  // TODO: Write module's logic
  const router = useRouter()
  const { data: session } = useSession()
  const [cloth, setCloth] = useState<ClothesPaymentInterface>()
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState(0)

  useEffect(() => {
    axios
      .get(
        `https://clothing-store-backend-production.up.railway.app/clothes/${id}`
      )
      .then((value) => {
        setCloth(value.data)
      })
  }, [])

  const submitButton = () => {
    console.log(session?.user.accessToken)
    axios
      .post(
        `https://clothing-store-backend-production.up.railway.app/payment/create`,
        {
          username: session?.user.username,
          clothId: cloth?.id,
          quantity: quantity,
          size: size,
          email: email,
          firstName: firstName,
          lastName: lastName,
          city: city,
          province: province,
          postalCode: postalCode,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      )
      .then((value) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        if (value.data != null) {
          Toast.fire({
            icon: 'success',
            title: 'Purchase successful',
            didClose: () => {
              router.push('/')
            },
          })
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Purchase failed',
            didClose: () => {
              router.push('/')
            },
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (session) {
    try {
      return (
        <>
          <main>
            <div className="container mx-auto max-w-screen-lg py-10">
              <div className="flex justify-center items-start">
                <div className="w-2/5 text-center">
                  <img
                    src={cloth?.image}
                    alt={cloth?.name}
                    style={{ paddingLeft: 20 }}
                  />
                  <h1 style={{ fontSize: 25 }}>{cloth?.name}</h1>
                </div>
                <div
                  className="w-3/5 text-start px-5"
                  style={{ backgroundColor: 'whitesmoke' }}
                >
                  <h1
                    style={{
                      textAlign: 'center',
                      fontSize: 30,
                      paddingBlock: 25,
                    }}
                  >
                    CHECKOUT
                  </h1>
                  <label
                    style={{
                      display: 'block',

                      fontSize: 15,
                    }}
                  >
                    Cloth Details
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      className="select select-bordered max-w-xs"
                      onChange={(event) => {
                        setSize(event.target.value)
                      }}
                      id="clothSize"
                      style={{ color: 'white', marginBlock: 15 }}
                    >
                      <option disabled selected>
                        Cloth Size
                      </option>
                      <option>XS</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <select
                      className="select select-bordered max-w-xs"
                      onChange={(event) => {
                        const data: number = Number(event.target.value)
                        setQuantity(data)
                      }}
                      id="clothQuantity"
                      style={{ color: 'white', marginBlock: 15 }}
                    >
                      <option disabled selected>
                        Cloth Quantity
                      </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <label
                    htmlFor="emailForm"
                    style={{
                      display: 'block',

                      fontSize: 15,
                    }}
                  >
                    Contact Information
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                    }}
                    id="emailForm"
                    style={{
                      display: 'block',
                      color: 'white',
                      marginBlock: 15,
                    }}
                  />
                  <label
                    style={{
                      display: 'block',
                      fontSize: 15,
                    }}
                  >
                    Shipping Address (all shipments will through JNE)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input input-bordered w-full"
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value)
                      }}
                      id="firstNameForm"
                      style={{
                        display: 'block',
                        color: 'white',
                        marginBlock: 15,
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input input-bordered w-full"
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value)
                      }}
                      id="LastNameForm"
                      style={{
                        display: 'block',
                        color: 'white',
                        marginBlock: 15,
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      className="input input-bordered w-full"
                      value={city}
                      onChange={(event) => {
                        setCity(event.target.value)
                      }}
                      id="cityForm"
                      style={{
                        display: 'block',
                        color: 'white',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Province"
                      className="input input-bordered w-full"
                      value={province}
                      onChange={(event) => {
                        setProvince(event.target.value)
                      }}
                      id="provinceForm"
                      style={{
                        display: 'block',
                        color: 'white',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="input input-bordered w-full"
                      onChange={(event) => {
                        const data: number = Number(event.target.value)
                        setPostalCode(data)
                      }}
                      id="postalCodeForm"
                      style={{
                        display: 'block',
                        color: 'white',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBlock: 15,
                      paddingTop: 20,
                    }}
                  >
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={() => {
                        router.push('/clothes')
                      }}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={submitButton}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <main>
        <h1>404 Not Found</h1>
      </main>
    </>
  )
}
