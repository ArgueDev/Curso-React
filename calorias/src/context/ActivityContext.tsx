import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categorias } from "../data/categorias";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriasConsumed: number
    caloriasBurned: number
    netCalorias: number
    categoriaName: (categoria: Activity["categoria"]) => string[]
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({children}: ActivityProviderProps) => {
    
    const [state, dispatch] = useReducer(activityReducer, initialState);

    // Contadores - caloriaTracker
    const caloriasConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.categoria === 1 ? total + activity.calorias : total, 0), [state.activities]);
    const caloriasBurned = useMemo(() => state.activities.reduce((total, activity) => activity.categoria === 2 ? total + activity.calorias : total, 0), [state.activities]);
    const netCalorias = useMemo(() => caloriasConsumed - caloriasBurned, [state.activities]);
    
    // ActivityList
    const categoriaName = useMemo( () =>
    (categoria: Activity['categoria']) => categorias.map(cat => cat.id === categoria ? cat.name : ''),
    [state.activities]);
    
    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriasConsumed,
            caloriasBurned,
            netCalorias,
            categoriaName
        }}>
            {children}
        </ActivityContext.Provider>
    )
}