import PHForm from "../../../../components/form/PHForm";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { toast } from "sonner";
import { useGetAllAcademicSemesterQuery } from "../../../../redux/features/Admin/AcademicSemester/academicSemesterApi";
import { TSemSubmitData, registerStatusOptions } from "./SemesterConstants";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import PHInput from "../../../../components/form/PHInput";
import { useCreateSemesterRegisterMutation } from "../../../../redux/features/Admin/Course/semesterRegisterApi";
import { TResponse } from "../../../../Types/gobalErrorHandler";

const CreateSemesterRegistration = () => {
  const { data: semesterData } = useGetAllAcademicSemesterQuery(undefined);
  const [createSemesterRegister] = useCreateSemesterRegisterMutation();
  console.log(semesterData?.data);

  //Mapping in here
  const semesterOptions = semesterData?.data?.map(
    (item: { _id: string; name: string; year: string }) => ({
      value: item._id,
      label: `${item.name}  ${item.year}`,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Academic Semester Create Processing");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    try {
      const res = (await createSemesterRegister(
        semesterData
      )) as TResponse<TSemSubmitData>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Create Semester Registration Successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.success("Something Went Wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={12}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              label="Select Semester"
              name="academicSemester"
              options={semesterOptions}
              placeHolder="Select Semester"
            />

            <PHSelect
              label="Select Semester Status"
              name="status"
              options={registerStatusOptions}
              placeHolder="Select Status"
            />
            <PHDatePicker name="startDate" label="Select Start Date" />
            <PHDatePicker name="endDate" label="Select End Date" />
            <PHInput
              type="text"
              name="minCredit"
              label="Min Credit"
              placeholder="Enter Here..."
            />
            <PHInput
              type="text"
              name="maxCredit"
              label="Max Credit"
              placeholder="Enter Here..."
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

export default CreateSemesterRegistration;
