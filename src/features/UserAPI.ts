import { IUser } from "@/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ILoginUser {
  email: string;
  password: string;
}

interface IUsers {
  users: IUser[];
}

export const userApi = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["user"],
  endpoints: (_builder) => ({
    registerUser: _builder.mutation<any, IUser>({
      query: (newUser) => ({
        url: `/complaints/auth/sign-up`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      }),
      invalidatesTags: ["user"]
    }),
    loginUser: _builder.mutation<any, ILoginUser>({
      query: (credentials) => ({
        url: `/complaints/auth/sign-in`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      }),
      invalidatesTags: ["user"]
    }),
    getAllUser: _builder.query<IUsers, void>({
      query: () => ({
        url: "/complaints/auth/get-all-users",
        method: "GET"
      }),
      providesTags: ["user"]
    })
  })
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUserQuery
} = userApi;
