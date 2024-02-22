import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import z from "zod";

const CreateFaculty = () => {
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  const academicFacultySchemas = z.object({
    name: z.string({ required_error: "Name is Required" }),
  });

  return (
    <div>
      <h1>This is a Create Faculty Components</h1>
      <div>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchemas)}
        >
          <PHInput
            type="text"
            name="name"
            label="Create Faculty"
            placeholder="Enter here..."
          />
        </PHForm>
      </div>
    </div>
  );
};

export default CreateFaculty;
