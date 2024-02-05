import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
};

const PHInput = ({ type, name, label, placeholder }: TInputProps) => {
  return (
    <div className=" mb-5 text-lg">
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input {...field} type={type} id={name} placeholder={placeholder} />
        )}
      />
    </div>
  );
};

export default PHInput;
