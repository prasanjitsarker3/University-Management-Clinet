import {
  TQueryParam,
  TResponseRedux,
} from "../../../../Types/gobalErrorHandler";
import { TSemRegisterData } from "../../../../pages/Admin/AcademicManagement/SemesterRegistration/SemesterConstants";
import { baseApi } from "../../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistration: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSemRegisterData>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createSemesterRegister: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSemesterRegisterMutation,
  useGetAllSemesterRegistrationQuery,
} = academicSemesterApi;
