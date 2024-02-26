import { Button, Col, Row } from "antd";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import { useGetAllSemesterRegistrationQuery } from "../../../../redux/features/Admin/Course/semesterRegisterApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllAcademicFacultyQuery } from "../../../../redux/features/Admin/AcademicFaculty/academicFacultyApi";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/Admin/AcademicDepartment/academicDepartmentApi";
import { useState } from "react";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
} from "../../../../redux/features/Admin/Course/courseApi";
import PHSelectWithWatch from "../../../../components/form/PHSelectWithWatch";
import PHInput from "../../../../components/form/PHInput";
import { TResponse } from "../../../../Types/gobalErrorHandler";
import PHTimePicker from "../../../../components/form/PHTimePicker";
import moment from "moment";
import { toast } from "sonner";

const CreateOfferedCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [addOfferCourse] = useAddOfferedCourseMutation();
  const { data: semRegisterData } =
    useGetAllSemesterRegistrationQuery(undefined);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const { data: facultiesData } = useGetCourseFacultiesQuery(courseId, {
    skip: !courseId,
  });
  console.log(facultiesData?.data);

  //Mapping section
  const semRegisterOptions = semRegisterData?.data?.map((item: any) => ({
    value: item._id,
    label: `${item.academicSemester.name} ${item.academicSemester.name} ${item.status}`,
  }));

  const facultyOptions = academicFacultyData?.data.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  const departmentOptions = academicDepartment?.data.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));
  const courseOptions = courseData?.data.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map(
    (item: { _id: any; fullName: any }) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const daysOptions = [
    { value: "Sat", label: "Sat" },
    { value: "Sun", label: "Sun" },
    { value: "Mon", label: "Mon" },
    { value: "Tue", label: "Tue" },
    { value: "Wed", label: "Wed" },
    { value: "Thu", label: "Thu" },
    { value: "Fri", label: "Fri" },
  ];

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Offered Course Creating Processing");
    console.log("Offer Course", data);
    const offerCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    const res = (await addOfferCourse(offerCourseData)) as TResponse<any>;
    console.log("Response", res);
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId, duration: 2000 });
    } else {
      toast.success("Create Offered Course Successfully", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Row justify="center" className=" md:px-12">
      <Col span={24}>
        <PHForm onSubmit={handleSubmit}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Sem Register"
                options={semRegisterOptions}
                name="semesterRegistration"
                label="Semester Registration"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Faculty"
                options={facultyOptions}
                name="academicFaculty"
                label="Academic Faculty"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Department"
                options={departmentOptions}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelectWithWatch
                placeHolder="Select Course"
                onValueChange={setCourseId}
                options={courseOptions}
                name="course"
                label="Academic Course"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Faculty"
                disabled={!courseId}
                options={facultiesOptions}
                name="faculty"
                label="Academic Faculty"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="section"
                label="Course Section"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="maxCapacity"
                label="Max Capacity"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Days"
                options={daysOptions}
                mode="multiple"
                name="days"
                label="Select Days"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHTimePicker name="startTime" label="Start Time" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHTimePicker name="endTime" label="Start Time" />
            </Col>
            <Button className=" w-full px-12" type="primary" htmlType="submit">
              Create Offered Course
            </Button>
          </Row>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateOfferedCourse;
