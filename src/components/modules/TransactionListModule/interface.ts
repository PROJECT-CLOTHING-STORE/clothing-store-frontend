export interface TransactionInterface {
  paymentId: number
  createdAt: Date
  firstName: string
  lastName: string
  email: string
  city: string
  province: string
  postalCode: number
  addressDetail: string
  quantity: number
  size: string
  isPaid: boolean
  cloth: {
    id: number
    image: string
    name: string
    price: number
  }
}
