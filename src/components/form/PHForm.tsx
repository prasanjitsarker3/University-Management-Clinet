import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  resolver: any;
};
const PHForm = ({ onSubmit, children, resolver }: TFromProps) => {
  const methods = useForm({ resolver });

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
