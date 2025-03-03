import { combineReducers } from 'redux';
interface ItemAction {
    type: string;
    id?: number;
    name?: string;
    precio?: number;
}

const item = (state = { items: [] }, action: ItemAction) => {
    const { type, ...item } = action;
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, { ...item }] };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter((item: any) => item.id !== action.id) };
        case 'GET_ITEMS':
            return state.items;
        default:
            return state;
    }
}


export default combineReducers({ item });