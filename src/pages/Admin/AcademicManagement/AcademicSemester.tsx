import { useGetAllAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);
  console.log("Data", data?.data);
  return (
    <div>
      <p>Get All Academic Semester Information !</p>
    </div>
  );
};

export default AcademicSemester;
