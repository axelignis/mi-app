export interface Sitter {
  id: string
  name: string
  location: string
  rating: number
  reviews: number
  price: number
  specialties: string[]
  image: string
  bio: string
  experience: number
  verified: boolean
  responseTime: string
  completedBookings: number
  services: Service[]
  gallery: string[]
  reviewsList: Review[]
}

export interface Service {
  name: string
  description: string
  price: number
  unit: string
}

export interface Review {
  author: string
  avatar: string
  rating: number
  date: string
  text: string
  petType: string
}
