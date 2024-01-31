import { useForm } from "react-hook-form";

type FieldType = {
  id?: string;
  password?: string;
};

const Login = () => {
  const { handleSubmit, register } = useForm<FieldType>();

  const onSubmit = (data: FieldType) => {
    console.log(data);
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh] bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/beautiful-snow-covered-mountains-landscape-kashmir-state-india_1232-4814.jpg?size=626&ext=jpg&ga=GA1.1.2060036261.1681297115&semt=sph")',
      }}
    >
      <div className="md:w-1/3 w-1/2 bg-gray-50 px-5 py-6 shadow-lg rounded-md ">
        <h1 className="text-center text-2xl">Please Log In Here!</h1>

        <form
          className="flex flex-col space-y-4 mx-auto "
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-xl" htmlFor="Enter ID">
            Enter Id
          </label>
          <input
            {...register("id", { required: "Please enter your username" })}
            className="p-2 border-2 border-gray-500 rounded-md"
            type="text"
            placeholder="Enter id..."
          />

          <label className="text-xl" htmlFor="Enter Password">
            Enter Password
          </label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            className="p-2 border-2 border-gray-500 rounded-md"
            type="password"
            placeholder="Enter Password..."
          />

          <button
            type="submit"
            className="p-2 py-3 cursor-pointer text-md bg-blue-600 border-0 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
