import React from "react";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/Admin/AcademicDepartment/academicDepartmentApi";
import { Button, Table, TableColumnsType } from "antd";

export type TTAcademicDepartment = {
  key: React.Key;
  _id: string;
  name: string;
  academicFaculty: {
    name: string;
  };
};
const AcademicDepartment = () => {
  const {
    data: academicDepartment,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepartmentQuery(undefined);

  const departmentTableData = academicDepartment?.data!.map(
    ({ _id, name, academicFaculty }: TTAcademicDepartment) => ({
      key: _id,
      _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );
  console.log(departmentTableData);
  const columns: TableColumnsType<TTAcademicDepartment> = [
    {
      title: "Department",
      dataIndex: "name",
    },
    {
      title: "Academic faculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button type="primary">Update</Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    <h1>Loading Page...</h1>;
  }

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={departmentTableData}
      />
    </div>
  );
};

export default AcademicDepartment;
