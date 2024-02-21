import PHForm from "../../../../components/form/PHForm";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { monthOptions, nameOptions } from "./SemesterConstans";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import z from "zod";
import { toast } from "sonner";
import { useCreateAcademicSemesterMutation } from "../../../../redux/features/Admin/AcademicSemester/academicSemesterApi";
import { TResponse } from "../../../../Types/gobalErrorHandler";
const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
type TSemesterData = {
  name: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();
  const methods = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = nameOptions[Number(data.name) - 1]?.label;

    const toastId = toast.loading("Academic Semester Create Processing");
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await createAcademicSemester(
        semesterData
      )) as TResponse<TSemesterData>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data?.message, { id: toastId, duration: 2000 });
        methods.reset();
      }
    } catch (error) {
      toast.success("Something Went Wrong", { id: toastId, duration: 2000 });
    }
  };
  const academicSemesterSchemas = z.object({
    name: z.string({ required_error: "Name is Required" }),
    year: z.string({ required_error: "Year is Required" }),
    startMonth: z.string({ required_error: "Month is Required" }),
    endMonth: z.string({ required_error: "Month is Required" }),
  });

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchemas)}
          >
            <PHSelect
              label="Select Name"
              name="name"
              options={nameOptions}
              placeHolder="Select Name"
            />
            <PHSelect
              label="Select Year"
              name="year"
              options={yearOptions}
              placeHolder="Select Year"
            />
            <PHSelect
              label="Select Start Month"
              name="startMonth"
              options={monthOptions}
              placeHolder="Select Month"
            />
            <PHSelect
              label="Select End Month"
              name="endMonth"
              options={monthOptions}
              placeHolder="Select Month"
            />
            <Button className=" w-full" type="primary" htmlType="submit">
              Create Semester
            </Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicSemester;
