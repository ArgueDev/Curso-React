import { z } from 'zod'

export const CategoriaAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
});

export const SearchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
});

export const DrinkSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
});

export const DrinksAPIRespone = z.object({
    drinks: z.array(DrinkSchema)
});

export const RecipeAPIResponseSchema = z.object({
    "drinks": z.array(z.record(z.string(), z.union([z.null(), z.string()]))),
});
