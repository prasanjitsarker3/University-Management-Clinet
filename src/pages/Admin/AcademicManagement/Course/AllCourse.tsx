import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { useState } from "react";
import {
  useAddAssignFacultyMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/Admin/Course/courseApi";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultiesQuery } from "../../../../redux/features/Admin/CreateUser/CreateUserApi";
import { TResponse } from "../../../../Types/gobalErrorHandler";
import { toast } from "sonner";

const AllCourse = () => {
  const [page, setPage] = useState(1);
  const { data: courseData, isFetching } = useGetAllCoursesQuery([
    { name: "page", value: page },
    { name: "sort", value: "code" },
  ]);
  const metaData = courseData?.meta;

  const courseTableData = courseData?.data?.map(
    ({ _id, title, prefix, code, credits }: any) => ({
      key: _id,
      _id,
      title,
      prefix,
      code,
      credits,
    })
  );

  const columns: TableColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <AssignFaculty facultyInfo={item} />
            <Button>Details</Button>
            <Button>Update</Button>
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
        dataSource={courseTableData}
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

const AssignFaculty = ({ facultyInfo }: { facultyInfo: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [createAssignFaculty] = useAddAssignFacultyMutation();

  const facultyOptions = facultiesData?.data?.map(
    (item: { _id: any; fullName: any }) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Assign Faculty Processing...");
    const assignData = {
      courseId: facultyInfo._id,
      data,
    };

    const res = (await createAssignFaculty(assignData)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId, duration: 2000 });
    } else {
      setIsModalOpen(false);
      toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            placeHolder="Select Faculty..."
            options={facultyOptions}
            name="faculties"
            label="Faculty"
          />
          <Button className=" w-full px-12" type="primary" htmlType="submit">
            Assign Faculty
          </Button>
        </PHForm>
      </Modal>
    </div>
  );
};

export default AllCourse;
