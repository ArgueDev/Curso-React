import {z} from 'zod'
import { CategoriaAPIResponseSchema, DrinksAPIRespone, DrinkSchema, RecipeAPIResponseSchema, SearchFilterSchema } from '../utils/recetas-schema'

export type Categorias = z.infer<typeof CategoriaAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIRespone>
export type Drink = z.infer<typeof DrinkSchema>
export type Receta = z.infer<typeof RecipeAPIResponseSchema>