import {
  TQueryParam,
  TResponseRedux,
} from "../../../../Types/gobalErrorHandler";
import { baseApi } from "../../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: "courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    addAssignFaculty: builder.mutation({
      query: (args) => {
        console.log("Args Check:", args);
        return {
          url: `courses/${args.courseId}/assign-faculties`,
          method: "PUT",
          body: args.data, // Assuming args contains the data to be sent in the request body
        };
      },
      invalidatesTags: ["courses"],
    }),
    getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAddAssignFacultyMutation,
  useAddOfferedCourseMutation,
  useGetCourseFacultiesQuery,
} = courseApi;
