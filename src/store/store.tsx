import { configureStore } from "@reduxjs/toolkit"
import { swApi } from "../Services/swapi-service";
import saveItemSlice from './saveItemSlice'

export const store = configureStore({
  reducer: {
    favorites: saveItemSlice,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(swApi.middleware),
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch