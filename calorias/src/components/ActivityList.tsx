import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"

import { useActivity } from "../hooks/useActivity"

export default function ActivityList() {

  const {state, dispatch, categoriaName } = useActivity();

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
      {state.activities.length === 0
        ? <p className="text-center my-5">No hay actividades aun...</p>
        : state.activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
          <div className="space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.categoria === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
              {categoriaName(activity.categoria)}
            </p>
            <p className="text-2xl font-bold pt-5">
              {activity.actividad}
            </p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calorias} {''}
              <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}
            >
              <PencilSquareIcon
                className="h-8 w-8 text-gray-800 hover:cursor-pointer"
              />
            </button>
            <button
              onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}
            >
              <XCircleIcon
                className="h-8 w-8 text-red-500 hover:cursor-pointer"
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
