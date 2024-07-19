import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface searchState {
    results: [],
    loading: boolean,
    error: boolean
}

const initialState: searchState = {
    results: [],
    loading: true,
    error: false
}

const searchSuccess = createAction<[]>('SEARCH_RESULTS_SUCCESS')

const updateSearchReducer = createReducer(initialState, (builder) => {
    builder.addCase(searchSuccess, (state, action) => {
        state.results = action.payload;
        state.error = false;
        state.loading = false;
        // return{
        //     state.results: action.payload,
        //     loading: false,
        //     error: null
        // }
    })
})

// const updateSearchResults = (state: searchState, action: PayloadAction) => {
//     if(state === undefined) {
//         return {
//             results: [],
//             loading: true,
//             error: false
//         }
//     }
//     switch (action.type) {
//         case 'SEARCH_RESULTS_SUCCESS':
//             return{
//                 results: action.payload,
//                 loading: false,
//                 error: null
//             }
//     }
// }

export default updateSearchReducer;