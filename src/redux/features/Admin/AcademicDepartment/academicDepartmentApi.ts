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
  }),
});

export const { useCreateAcademicDepartmentMutation } = academicDepartment;
