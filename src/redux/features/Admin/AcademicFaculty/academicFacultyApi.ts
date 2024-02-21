import { TReduxResponse } from "../../../../Types/gobalErrorHandler";
import { TAcademicFaculty } from "../../../../pages/Admin/AcademicManagement/AcademicFaculty/AcademicFaculty";
import { baseApi } from "../../../api/baseApi";

const createAcademicFaculty = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TAcademicFaculty>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useCreateAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
} = createAcademicFaculty;
