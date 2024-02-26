import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Button } from "antd";
import { useCreateAcademicFacultyMutation } from "../../../../redux/features/Admin/AcademicFaculty/academicFacultyApi";
import { toast } from "sonner";
import { TResponse } from "../../../../Types/gobalErrorHandler";

type TFaculty = {
  name: string;
};
const CreateAcademicFaculty = () => {
  const methods = useForm();
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Create Academic Faculty...");
    const facultyData = {
      name: data.name,
    };
    try {
      const res = (await createAcademicFaculty(facultyData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        methods.reset();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const academicFacultySchemas = z.object({
    name: z.string({ required_error: "Name is Required" }),
  });

  return (
    <div>
      <p className=" text-center text-xl">Create Faculty</p>
      <div className=" md:w-1/2 mx-auto shadow-xl  p-5 rounded-lg">
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchemas)}
        >
          <PHInput
            type="text"
            name="name"
            label="Create Faculty"
            placeholder="Enter here..."
          />

          <Button htmlType="submit" type="primary" className=" w-full">
            Create Faculty
          </Button>
        </PHForm>
      </div>
    </div>
  );
};

export default CreateAcademicFaculty;
