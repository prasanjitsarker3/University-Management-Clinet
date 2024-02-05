import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import loginBack from "../assets/images/loginBack.avif";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

type FieldType = {
  id?: string;
  password?: string;
};

const Login = () => {
  // const { handleSubmit, register } = useForm<FieldType>({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldType) => {
    console.log(data);
    const toastId = toast.loading("Logging In...");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log("Users", user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("User Login Success", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.log(err);
      toast.error("Something is wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh] bg-cover bg-center"
      style={{
        backgroundImage: `url('${loginBack}')`,
      }}
    >
      <div className="md:w-1/3 w-1/2 bg-gray-50 px-5 py-6 shadow-lg rounded-md ">
        <h1 className="text-center text-2xl">Please Log In Here!</h1>
        <PHForm onSubmit={onSubmit}>
          <PHInput
            type="text"
            name="id"
            label="User Id:"
            placeholder="Enter Id..."
          />
          <PHInput
            type="password"
            name="password"
            label="User Password:"
            placeholder="Enter Password..."
          />
          <button
            type="submit"
            className="p-2 py-3 cursor-pointer text-md bg-blue-600 border-0 rounded-md text-white w-full"
          >
            Login
          </button>
        </PHForm>
      </div>
    </div>
  );
};

export default Login;
