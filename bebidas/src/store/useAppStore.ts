import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecetaSlice, type RecetaSliceType } from './recetaSlice'

export const useAppStore = create<RecetaSliceType>()(devtools((...args) => ({
    ...createRecetaSlice(...args)
})))