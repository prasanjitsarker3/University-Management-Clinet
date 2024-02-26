import {
  TQueryParam,
  TResponseRedux,
} from "../../../../Types/gobalErrorHandler";
// import { TSemesterDataType } from "../../../../pages/Admin/AcademicManagement/AcademicSemester/AcademicSemester";
import { baseApi } from "../../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useCreateAcademicSemesterMutation,
} = academicSemesterApi;
