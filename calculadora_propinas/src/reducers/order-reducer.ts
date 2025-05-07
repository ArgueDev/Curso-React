import { MenuItem, OrderItem } from "../types";

export type OrderAction =
    { type: 'add-item', paylod: { item: MenuItem } } |
    { type: 'remove-item', paylod: { id: MenuItem['id'] } } |
    { type: 'place-order' } |
    { type: 'add-tip', paylod: { tip: number } };

export type OrderState = {
    order: OrderItem[],
    tip: number
}

export const initialState: OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (state: OrderState = initialState, action: OrderAction) => {
    
    if (action.type === 'add-item') {
        
        const itemExists = state.order.find(orderItem => orderItem.id === action.paylod.item.id);
        let updateOrder: OrderItem[] = []
        
        if (itemExists) {
            updateOrder = state.order.map(orderItem => orderItem.id === action.paylod.item.id
                ? { ...orderItem, quantity: orderItem.quantity + 1 }
                : orderItem
            );
        } else {
            const newItem: OrderItem = { ...action.paylod.item, quantity: 1 };
            updateOrder = [...state.order, newItem];
        }

        return {
            ...state,
            order: updateOrder
        }
    } 

    if (action.type === 'remove-item') {
        const itemExists = state.order.filter(item => item.id !== action.paylod.id);

        return {
            ...state,
            order: itemExists
        }
    }

    if (action.type === 'place-order') {

        return {
            ...state,
            order: [],
            tip: 0
        }
    }

    if (action.type === 'add-tip') {
    
        const tip = action.paylod.tip;

        return {
            ...state,
            tip
        }
    }

    return state;


}