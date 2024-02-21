import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeHolder: string;
};

const PHSelect = ({ label, name, options, placeHolder }: TPHSelectProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              {...field}
              style={{ width: "100%" }}
              placeholder={placeHolder}
              options={options}
              size="large"
            />
            {error && <small className=" text-red-500">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHSelect;
