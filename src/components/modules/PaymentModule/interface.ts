export interface ClothesPaymentInterface {
  id: number
  createdAt: Date
  image: string
  stock: number
  price: number
  name: string
  description: string
  tags: string[]
  isAvailable: boolean
}
