import {
  TQueryParam,
  TResponseRedux,
} from "../../../../Types/gobalErrorHandler";
import { TStudent } from "../../../../pages/Admin/UserManagement/Student/StudentConstant";
import { baseApi } from "../../../api/baseApi";

const createUser = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
} = createUser;
