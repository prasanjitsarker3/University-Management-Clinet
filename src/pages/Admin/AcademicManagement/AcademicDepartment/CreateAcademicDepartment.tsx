import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import z from "zod";
import { useGetAllAcademicFacultyQuery } from "../../../../redux/features/Admin/AcademicFaculty/academicFacultyApi";
import PHSelect from "../../../../components/form/PHSelect";
import { useCreateAcademicDepartmentMutation } from "../../../../redux/features/Admin/AcademicDepartment/academicDepartmentApi";
import { toast } from "sonner";
import { TResponse } from "../../../../Types/gobalErrorHandler";

type TDepartment = {
  name: string;
  academicDepartment: string;
};

const CreateAcademicDepartment = () => {
  const methods = useForm();
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();

  const facultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id, // Assuming _id is the unique identifier for each academic faculty
    label: item.name, // Assuming name is the property you want to display in the select options
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Department Processing...!");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    try {
      const res = (await createAcademicDepartment(
        departmentData
      )) as TResponse<TDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data?.message, { id: toastId, duration: 2000 });
        methods.reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const academicDepartmentSchemas = z.object({
    name: z.string({ required_error: "Name is Required" }),
    academicFaculty: z.string({
      required_error: "Academic Faculty is Required",
    }),
  });
  return (
    <div>
      <p className=" text-center text-xl">Create Academic Faculty</p>
      <div className=" md:w-1/2 mx-auto shadow-xl  p-5 rounded-lg">
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchemas)}
        >
          <PHInput
            type="text"
            name="name"
            label="Create Faculty"
            placeholder="Enter here..."
          />
          <PHSelect
            label="Select Academic Faculty"
            name="academicFaculty"
            options={facultyOptions}
            placeHolder="Select Faculty"
          />
          <Button htmlType="submit" type="primary" className=" w-full">
            Create Academic Department
          </Button>
        </PHForm>
      </div>
    </div>
  );
};

export default CreateAcademicDepartment;
