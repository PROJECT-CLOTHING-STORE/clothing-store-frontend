export interface TransactionInterface {
  paymentId: number
  createdAt: Date
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
