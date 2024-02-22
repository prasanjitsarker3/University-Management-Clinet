import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import z from "zod";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../gobalConstans";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/Admin/AcademicDepartment/academicDepartmentApi";
import { useGetAllAcademicSemesterQuery } from "../../../../redux/features/Admin/AcademicSemester/academicSemesterApi";
import PHDatePicker from "../../../../components/form/PHDatePicker";

const CreateStudent = () => {
  const { data: semesterData, isFetching: sFetching } =
    useGetAllAcademicSemesterQuery(undefined);
  const { data: academicDepartment } = useGetAllAcademicDepartmentQuery(
    undefined,
    { skip: sFetching }
  );

  const semesterOptions = semesterData?.data!.map((item) => ({
    value: item._id,
    label: `${item.name}  ${item.year}`,
  }));

  const departmentOptions = academicDepartment?.data!.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Data", data);
  };

  const academicDepartmentSchemas = z.object({
    name: z.object({
      firstName: z.string({ required_error: "First Name is Required" }),
      middleName: z.string({ required_error: "Middle Name is Required" }),
      lastName: z.string({ required_error: "Last Name is Required" }),
    }),
  });

  return (
    <div>
      <PHForm
        onSubmit={onSubmit}
        resolver={zodResolver(academicDepartmentSchemas)}
      >
        <Row gutter={12}>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="name.firstName"
              label="First Name"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="name.middleName"
              label="Middle Name"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="name.lastName"
              label="Last Name"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHSelect
              label="Select Gender"
              name="gender"
              options={genderOptions}
              placeHolder="Select Male/Female"
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHDatePicker name="dateOfBirth" label="Select Date" />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="email"
              name="email"
              label="Enter Email"
              placeholder="Enter here..."
            />
          </Col>
        </Row>
        <Divider>Contract Information</Divider>
        <Row gutter={12}>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="contactNo"
              label="Contract Number"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="emergencyContactNo"
              label="Emergency Contract Number"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHSelect
              label="Blood Group"
              name="bloogGroup"
              options={bloodGroupOptions}
              placeHolder="Select Blood Group"
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="presentAddress"
              label="Present Address"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="permanentAddress"
              label="Permanent Address"
              placeholder="Enter here..."
            />
          </Col>
        </Row>

        <Divider>Guardian Information</Divider>
        <Row gutter={12}>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="guardian.fatherName"
              label="Father Name"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="guardian.fatherOccupation"
              label="Father Occupation"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="guardian.fatherContactNo"
              label="Father Contact No."
              placeholder="Enter here..."
            />
          </Col>

          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="guardian.motherName"
              label="Mother Name"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="guardian.motherOccupation"
              label="Mother Occupation"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="guardian.motherContactNo"
              label="Mother Contact No."
              placeholder="Enter here..."
            />
          </Col>
        </Row>

        <Divider>Local Guardian</Divider>
        <Row gutter={12}>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="localGuardian.name"
              label="Local Guardian Name"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="localGuardian.occupation"
              label="Local Guardian Occupation"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="localGuardian.contactNo"
              label="Local Guardian Contact No."
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHInput
              type="text"
              name="localGuardian.address"
              label="Local Guardian Address"
              placeholder="Enter here..."
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHSelect
              label="Admission Semester"
              name="admissionSemester"
              options={semesterOptions}
              placeHolder="Select Semester"
            />
          </Col>
          <Col lg={{ span: 8 }} md={{ span: 12 }} span={8}>
            <PHSelect
              label="Academic Department"
              name="academicDepartment"
              options={departmentOptions}
              placeHolder="Select Department"
            />
          </Col>
        </Row>
        <Button htmlType="submit">Create Student</Button>
      </PHForm>
    </div>
  );
};

export default CreateStudent;
