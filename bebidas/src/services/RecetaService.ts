import axios from 'axios'
import { CategoriaAPIResponseSchema, DrinksAPIRespone, RecipeAPIResponseSchema } from '../utils/recetas-schema';
import type { Drink, SearchFilter } from '../types';

export async function getCategorias() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    
    const result = CategoriaAPIResponseSchema.safeParse(data)
    
    if (result.success) {
        return result.data
    }
    
}

export async function getRecetas(filters: SearchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data} = await axios(url)
    
    const result = DrinksAPIRespone.safeParse(data)

    if (result.success) {
        return result.data
    }

}

export async function getRecetaID(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    // console.log(data)
    const result = RecipeAPIResponseSchema.safeParse(data);
    // console.log(result)

    if (result.success) {
        return result.data
    }

}