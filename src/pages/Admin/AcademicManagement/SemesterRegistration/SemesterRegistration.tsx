import {
  Button,
  Dropdown,
  MenuProps,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { useState } from "react";
import { TSemRegisterData } from "./SemesterConstants";
import {
  useGetAllSemesterRegistrationQuery,
  useUpdateSemesterRegisterMutation,
} from "../../../../redux/features/Admin/Course/semesterRegisterApi";
import moment from "moment";

export type TTableData = Pick<
  TSemRegisterData,
  "academicSemester" | "status" | "startDate" | "endDate"
>;

const SemesterRegistration = () => {
  const [page, setPage] = useState(1);
  const [dataId, setDataId] = useState("");
  const { data: semRegisterData, isFetching } =
    useGetAllSemesterRegistrationQuery([
      { name: "page", value: page },
      { name: "sort", value: "year" },
    ]);
  const [updateSemesterUpdate] = useUpdateSemesterRegisterMutation();
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
  const items: MenuProps["items"] = [
    {
      label: "UPCOMING",
      key: "UPCOMING",
    },
    {
      label: "ONGOING",
      key: "ONGOING",
    },
    {
      label: "ENDED",
      key: "ENDED",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    const semesterUpdateData = {
      id: dataId,
      data: {
        status: e.key,
      },
    };
    console.log("Update Data", semesterUpdateData);
    try {
      const res = await updateSemesterUpdate(semesterUpdateData);
      console.log("Res Data", res);
    } catch (error) {
      console.error(
        "Error occurred while updating semester registration:",
        error
      );
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

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
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
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
      render: (item) => {
        return (
          <Space>
            <Button>Details</Button>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setDataId(item._id)} type="primary">
                Update
              </Button>
            </Dropdown>
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
