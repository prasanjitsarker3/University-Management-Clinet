import PHForm from "../../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { toast } from "sonner";
import PHInput from "../../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/Admin/Course/courseApi";
import { TResponse } from "../../../../Types/gobalErrorHandler";

const CreateCourse = () => {
  const { data: allCourseData } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();
  //Mapping in here
  const courseOptions = allCourseData?.data?.map(
    (item: { _id: string; title: string }) => ({
      value: item._id,
      label: item.title,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Course Create Processing");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    try {
      const res = (await addCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Course Create Successfully", {
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
            <PHInput
              type="text"
              name="title"
              label="Course Title"
              placeholder="Enter Here..."
            />
            <PHInput
              type="text"
              name="prefix"
              label="Course Prefix"
              placeholder="Enter Here..."
            />
            <PHInput
              type="text"
              name="code"
              label="Course Code"
              placeholder="Enter Here..."
            />
            <PHInput
              type="text"
              name="credits"
              label="Course Credits"
              placeholder="Enter Here..."
            />
            <PHSelect
              label="Select Pre Requisite Courses"
              name="preRequisiteCourses"
              mode="multiple"
              options={courseOptions}
              placeHolder="Select Course"
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

export default CreateCourse;
