import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
    results: [],
    loading: boolean,
    error: null | Error
}

const initialState: SliceState = {
    results: [],
    loading: true,
    error: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchSuccess(state, action) {
            state.results = action.payload;
            state.error = null;
            state.loading = false;
        },
        searchRequest(state, action) {
            state.results = [];
            state.error = null;
            state.loading = action.payload;
        },
        searchFailure(state, action) {
            state.results = [];
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const {searchSuccess, searchRequest, searchFailure} = searchSlice.actions;
export default searchSlice.reducer;