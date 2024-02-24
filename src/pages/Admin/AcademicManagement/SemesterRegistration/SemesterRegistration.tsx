import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { TSemRegisterData } from "./SemesterConstants";
import { useGetAllSemesterRegistrationQuery } from "../../../../redux/features/Admin/Course/semesterRegisterApi";
import moment from "moment";

export type TTableData = Pick<
  TSemRegisterData,
  "academicSemester" | "status" | "startDate" | "endDate"
>;

const SemesterRegistration = () => {
  const [page, setPage] = useState(1);
  const { data: semRegisterData, isFetching } =
    useGetAllSemesterRegistrationQuery([
      { name: "page", value: page },
      { name: "sort", value: "startMonth" },
    ]);
  console.log(semRegisterData?.data);
  const metaData = semRegisterData?.meta;

  const semRegisterTableData = semRegisterData?.data?.map(
    ({
      _id,
      academicSemester,
      status,
      startDate,
      endDate,
    }: TSemRegisterData) => ({
      key: _id,
      _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Semester",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Start Month",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Month",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button type="primary">Update</Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={semRegisterTableData}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default SemesterRegistration;
