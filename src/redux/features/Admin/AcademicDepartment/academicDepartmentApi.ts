import { TReduxResponse } from "../../../../Types/gobalErrorHandler";
import { TTAcademicDepartment } from "../../../../pages/Admin/AcademicManagement/AcademicDepartment/AcademicDepartment";
import { baseApi } from "../../../api/baseApi";

const academicDepartment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicDepartment: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TTAcademicDepartment>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = academicDepartment;
