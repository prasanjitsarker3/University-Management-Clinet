import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/Admin/CreateUser/CreateUserApi";
import StudentDiv from "../../../../utils/StudentDiv";

const StudentDetails = () => {
  const { studentId } = useParams(); // Destructure the specific parameter value
  const { data: singleStudentData } = useGetSingleStudentQuery(studentId);
  const data = singleStudentData?.data;
  return (
    <div>
      <h2 className="text-center text-blue-700">Student Details Information</h2>

      <div className=" grid md:grid-cols-3 gap-5">
        <StudentDiv label="name" data={data?.fullName} />
        <StudentDiv label="Gender" data={data?.gender} />
        <StudentDiv label="Date of Birthday" data={data?.dateOfBirth} />
      </div>
    </div>
  );
};

export default StudentDetails;
