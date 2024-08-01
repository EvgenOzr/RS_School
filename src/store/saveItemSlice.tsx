import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";


export interface ItemsState {
    items: object[]
}

const initialState: ItemsState = {
    items: []
}

const saveItemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<object>) {
            state.items.push(action.payload)
        },

        deleteItem(state, action) {
            const indexDelete = state.items.findIndex(item => item.name === action.payload.name)
            state.items =  [
                    ...state.items.slice(0, indexDelete),
                    ...state.items.slice(indexDelete + 1)
                ]
        },

        deleteAll(state) {
            state.items = []
        }
    }
})

export const {addItem, deleteItem, deleteAll} = saveItemSlice.actions;
export default saveItemSlice.reducer;