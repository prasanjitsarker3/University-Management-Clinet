import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
// import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
// import z from "zod";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { bloodGroupOptions, genderOptions } from "../gobalConstans";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/Admin/AcademicDepartment/academicDepartmentApi";
import { useGetAllAcademicSemesterQuery } from "../../../../redux/features/Admin/AcademicSemester/academicSemesterApi";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import PHSelect from "../../../../components/form/PHSelect";
import { useAddStudentMutation } from "../../../../redux/features/Admin/CreateUser/CreateUserApi";
import { TResponse } from "../../../../Types/gobalErrorHandler";
import { TStudent } from "./StudentConstant";
import { toast } from "sonner";

const CreateStudent = () => {
  const { reset } = useForm();
  const [addStudent] = useAddStudentMutation();
  const { data: semesterData } = useGetAllAcademicSemesterQuery(undefined);
  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = semesterData?.data!.map(
    (item: { _id: any; name: any; year: any }) => ({
      value: item._id,
      label: `${item.name}  ${item.year}`,
    })
  );

  const departmentOptions = academicDepartment?.data!.map(
    (item: { _id: any; name: any }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    2;
    const toastId = toast.loading("Student Create Processing");
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    const res = (await addStudent(formData)) as TResponse<TStudent>;
    if (res?.error) {
      toast.error(res.error.data.message, { id: toastId, duration: 2000 });
    } else {
      reset();
      toast.success("Student Create Successfully", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Row justify="center" className=" md:px-12">
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicDepartmentSchemas)}
        >
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.firstName"
                label="First Name"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.middleName"
                label="Middle Name"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.lastName"
                label="Last Name"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Gender"
                options={genderOptions}
                name="gender"
                label="Gender"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Blood Group"
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Select Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="email"
                label="Email"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="contactNo"
                label="Contact"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
                placeholder="Enter Here..."
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
                placeholder="Enter Here..."
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Name"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
                placeholder="Enter Here..."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
                placeholder="Enter Here..."
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Semester"
                options={semesterOptions}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                placeHolder="Select Department"
                options={departmentOptions}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>

          <Button className=" w-full" type="primary" htmlType="submit">
            Create Student
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
