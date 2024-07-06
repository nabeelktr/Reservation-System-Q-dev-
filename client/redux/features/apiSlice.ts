import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/",
    }),
    endpoints: (builder) => ({
        getAvailableRooms: builder.mutation({
            query: (data) => ({
                url: "get-available-rooms",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),

    })
})

export const {useGetAvailableRoomsMutation} = apiSlice;