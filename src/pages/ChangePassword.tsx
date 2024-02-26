import { Button } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import loginBack from "../assets/images/loginBack.avif";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { TResponse } from "../Types/gobalErrorHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Change Password Processing !");
    console.log(data);
    const userData = {
      ...data,
    };
    const res = (await changePassword(userData)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId, duration: 2000 });
    } else {
      toast.success("Create Offered Course Successfully", {
        id: toastId,
        duration: 2000,
      });
      dispatch(logOut());
      navigate("/login");
    }
    console.log(res);
  };
  return (
    <div
      className="flex justify-center items-center h-[100vh] bg-cover bg-center"
      style={{
        backgroundImage: `url('${loginBack}')`,
      }}
    >
      <div className="md:w-1/3 w-1/2 bg-gray-50 px-5 py-6 shadow-lg rounded-md ">
        <PHForm onSubmit={onSubmit}>
          <PHInput
            type="text"
            name="oldPassword"
            label="Old Password"
            placeholder="Enter Here..."
          />
          <PHInput
            type="text"
            name="newPassword"
            label="New Password"
            placeholder="Enter Here..."
          />

          <Button className=" w-full" type="primary" htmlType="submit">
            Change Password
          </Button>
        </PHForm>
      </div>
    </div>
  );
};

export default ChangePassword;
