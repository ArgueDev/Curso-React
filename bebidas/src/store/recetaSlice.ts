import type { StateCreator } from "zustand"
import { getCategorias, getRecetaID, getRecetas } from "../services/RecetaService"
import type { Categorias, Drink, Drinks, Receta, SearchFilter } from "../types"

export type RecetaDetalle = Receta['drinks'][number]

export type RecetaSliceType = {
    categorias: Categorias
    drinks: Drinks
    selectedReceta: RecetaDetalle | null
    modal: boolean
    fetchCategorias: () => Promise<void>
    searchRecetas: (searchFilter: SearchFilter) => Promise<void>
    selectReceta: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecetaSlice: StateCreator<RecetaSliceType> = (set) => ({
    categorias: {
        drinks: []
    },

    drinks: {
        drinks: []
    },

    selectedReceta: null,

    modal: false,

    fetchCategorias: async () => {
        const categorias = await getCategorias()
        
        set({
            categorias
        })
        
    },

    searchRecetas: async (filters) => {
        const drinks = await getRecetas(filters)

        set({
            drinks
        })
    },

    selectReceta: async (id) => {
        const data = await getRecetaID(id)

        set({
            selectedReceta: data?.drinks?.[0] ?? null,
            modal: true
        })
    },

    closeModal: () => {
        set({
            modal: false,
            selectedReceta: {}
        })
    }
})