import { Form, Input } from "antd";
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
      {/* {label ? label : null} */}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              size="large"
            />
            {error && <small className=" text-red-500">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
