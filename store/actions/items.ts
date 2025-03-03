export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const GET_ITEMS = 'GET_ITEMS';

export const addItem =
    (item: { nombre: string, precio: number, id: string }) => ({ type: ADD_ITEM, item });

export const remove_item = (id: string) => ({ type: REMOVE_ITEM, id });