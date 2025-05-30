import { Dispatch } from 'react'
import type { MenuItem } from '../types'
import { OrderAction } from '../reducers/order-reducer'

type MenuItemProps = {
  item: MenuItem,
  dispatch: Dispatch<OrderAction>
}

export default function MenuItem({item, dispatch}: MenuItemProps) {
  return (
      <>
      <button
        className='border-2 border-teal-400 hover:bg-teal-200 p-3 text-lg rounded-lg flex justify-between min-w-full'
        onClick={() => dispatch({type: 'add-item', paylod: {item}})}>
            <p>{item.name}</p>
            <p className='font-black'>${ item.price }</p>      
          </button>
      </>
  )
}
