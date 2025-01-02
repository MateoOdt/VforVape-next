import { z } from "zod"
import { productSchema } from "@/lib/validations/catalog"

export interface Category {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

export type ProductFormValues = z.infer<typeof productSchema>