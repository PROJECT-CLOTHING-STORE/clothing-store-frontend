export interface ClothesInterface {
  id: number
  createdAt: Date
  image: string
  stock: number
  name: string
  description: string
  tags: string[]
  isAvailable: boolean
}
