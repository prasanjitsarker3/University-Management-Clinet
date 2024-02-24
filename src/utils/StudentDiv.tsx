type TDiv = {
  label: string;
  data: string;
};

const StudentDiv = ({ label, data }: TDiv) => {
  return (
    <div className="space-y-1">
      <h4 className=" text-blue-600 font-semibold">{label}</h4>
      <h4 className=" text-gray-900">{data}</h4>
    </div>
  );
};

export default StudentDiv;
