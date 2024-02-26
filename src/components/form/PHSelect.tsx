import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeHolder: string;
  mode?: "multiple" | undefined;
  disabled?: boolean;
};

const PHSelect = ({
  label,
  name,
  options,
  placeHolder,
  mode,
  disabled,
}: TPHSelectProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              {...field}
              style={{ width: "100%" }}
              mode={mode}
              placeholder={placeHolder}
              options={options}
              size="large"
              disabled={disabled}
            />
            {error && <small className=" text-red-500">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHSelect;
