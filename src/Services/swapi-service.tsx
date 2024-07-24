import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";

export const swApi = createApi({
	reducerPath: 'swApi',
	baseQuery: fetchBaseQuery({baseUrl: 'https://swapi.dev/api/'}),
	endpoints: (builder) => ({
		getSearch: builder.query({
			query: (search, ) => `${search}`
		}),
	})
})

export const {useGetSearchQuery} = swApi;

