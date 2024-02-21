import React from "react";
import { useGetAllAcademicFacultyQuery } from "../../../../redux/features/Admin/AcademicFaculty/academicFacultyApi";
import { Button, Table, TableColumnsType } from "antd";

export type TAcademicFaculty = {
  name: string;
};

export interface DataType {
  key: React.Key;
  _id: string;
  name: string;
}

const AcademicFaculty = () => {
  const {
    data: academicFacultyData,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultyQuery(undefined);

  const facultyTableData = academicFacultyData?.data?.map(
    ({ _id, name }: DataType) => ({
      key: _id,
      _id,
      name,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
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
    <h1 className="">Loading</h1>;
  }

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={facultyTableData}
      />
    </div>
  );
};

export default AcademicFaculty;
